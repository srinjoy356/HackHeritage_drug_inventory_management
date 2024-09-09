from flask import Flask, request, jsonify, session, g, send_from_directory
from sql_connection import get_sql_connection
import mysql.connector
import json
import os
import uuid
import cv2

import hashlib

import sign_up
import log_in
from pyzbar import pyzbar

import products_dao
import orders_dao
import uom_dao
from flask_cors import CORS
from submit import submit
from bar_code_scanner import scan_barcodes




app = Flask(__name__)

CORS(app)

app.secret_key = 'your_secret_key'

connection = get_sql_connection()



def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host='localhost',
            user='root',
            password='april@1904',
            database='drug_inventory'
        )
    return g.db

@app.teardown_appcontext
def close_connection(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()


@app.route('/getUOM', methods=['GET'])
def get_uom():
    response = uom_dao.get_uoms(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getProducts', methods=['GET'])
def get_products():
    response = products_dao.get_all_products(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/insertProduct', methods=['POST'])
def insert_product():
    request_payload = json.loads(request.form['data'])
    user_id = request_payload.get('user_id')  # Extract the user_id from the request payload

    # Pass the user_id along with the product details to the insert_new_product function
    product_id = products_dao.insert_new_product(connection, request_payload, user_id)

    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    connection = get_db()
    response = orders_dao.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrder', methods=['POST'])
def insert_order():
    request_payload = json.loads(request.form['data'])
    order_id = orders_dao.insert_order(connection, request_payload)
    response = jsonify({
        'order_id': order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/updateOrder', methods=['POST'])
def update_order():
    request_payload = json.loads(request.form['data'])
    print(request_payload)
    order_id = request_payload['order_id']  # Ensure the order ID is included in the payload
    updated_order_id = orders_dao.update_order(connection, order_id, request_payload)
    response = jsonify({
        'order_id': updated_order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteProduct/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        return_id = products_dao.delete_product(connection, product_id)
        response = jsonify({
            'success': True,
            'product_id': return_id
        })
    except Exception as e:
        response = jsonify({
            'success': False,
            'error': str(e)
        })

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




@app.route('/editProduct', methods=['POST'])
def edit_product():
    try:
        # Parse the JSON data sent in the POST request
        request_payload = json.loads(request.form['data'])

        # Extract the product_id and the updated product details from the payload
        product_id = request_payload['product_id']
        updated_product = {
            'name': request_payload['name'],
            'price_per_unit': request_payload['price_per_unit'],
            'quantity_of_uom': request_payload['quantity_of_uom'],
            'category': request_payload['category'],
            'shelf_num': request_payload['shelf_num'],
            'description': request_payload['description']
        }

        # Call the edit_product function from products_dao and pass the connection, product_id, and updated_product
        rows_affected = products_dao.edit_product(connection, product_id, updated_product)

        # Prepare the response indicating success or failure based on rows_affected
        response = jsonify({
            'success': rows_affected > 0,
            'rows_affected': rows_affected
        })

        # Allow cross-origin requests
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500



@app.route('/login', methods=['POST'])
def login_route():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    # Input validation
    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    connection = get_sql_connection()
    result = log_in.log_in(connection, username, password)

    if result['status'] == 'success':
        return jsonify({"message": "Login successful", "unique_user_id": result['unique_user_id']}), 200
    else:
        return jsonify({"error": result['message']}), 401



@app.route('/signup', methods=['POST'])
def signup_route():
    data = request.json

    username = data.get('username')
    password = data.get('password')
    user_type = data.get('user_type')

    # Input validation (you can add more checks here)
    if not username or not password or not user_type:
        return jsonify({"error": "Missing required fields"}), 400

    connection = get_sql_connection()
    result = sign_up.sign_up(connection, username, password, user_type)

    if "Error" in result:
        return jsonify({"error": result}), 400
    else:
        return jsonify({"message": result}), 201


@app.route('/OCR')
def serve_index():
    # Serve the React app's index.html file
    return send_from_directory('../frontend/src/landing_page/warehouse', 'OCR.js')

@app.route('/<path:filename>')
def serve_static_file(filename):
    # Serve static files from the React app's build directory
    return send_from_directory('../frontend/src/landing_page/warehouse', filename)

@app.route('/extractFromDoc', methods=['POST'])
def extract_from_doc():
    file_format = request.form.get('file_format')
    file = request.files['file']

    # Save the uploaded file
    file_path = os.path.join("uploads", str(uuid.uuid4()) + ".pdf")
    file.save(file_path)

    # Call the submit function to extract the data
    data, error = submit(file_path, file_format)

    # Clean up the file after processing
    if os.path.exists(file_path):
        os.remove(file_path)

    if error:
        return jsonify({'status': 'error', 'message': error}), 500

    # Return the extracted data as a JSON response
    return jsonify({"message": data}), 201

@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.json
    product_id = data.get('product_id')

    if not product_id:
        return jsonify({"error": "Missing product_id"}), 400

    # Call the scan_barcodes function only when triggered from the frontend (this happens on POST)
    barcode = scan_barcodes("http://192.168.246.235:8080/video")  # Pass your video stream URL here

    if not barcode:
        return jsonify({"error": "Failed to scan barcode"}), 400

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("INSERT INTO blockchain_bar (product_id, barcode) VALUES (%s, %s)", (product_id, barcode))
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({"message": "Product added successfully", "barcode": barcode}), 201


# Route to scan and compare barcodes
@app.route('/scan_and_compare', methods=['POST'])
def scan_and_compare():
    data = request.json
    product_id = data.get('product_id')

    if not product_id:
        return jsonify({"error": "Missing product_id"}), 400

    # Predefined URL for video stream
    predefined_url = "http://192.168.246.235:8080/video"  # Replace with your actual URL

    # Scan the barcode from the predefined video stream URL
    scanned_barcode = scan_barcodes(predefined_url)
    if not scanned_barcode:
        return jsonify({"error": "No barcode detected"}), 404

    # Retrieve the stored barcode from the database
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute("SELECT barcode FROM blockchain_bar WHERE product_id = %s", (product_id,))
    result = cursor.fetchone()

    if not result:
        return jsonify({"error": "Product not found in the database"}), 404

    stored_barcode = result[0]
    cursor.close()
    connection.close()

    # Compare the scanned barcode with the stored barcode
    if scanned_barcode == stored_barcode:
        return jsonify({"message": "Barcodes match. Product received successfully."}), 200
    else:
        return jsonify({"error": "Barcodes do not match. Possible malpractice detected!"}),400




if __name__ == "__main__":
    print("Starting Python Flask Server For Drug Inventory Management System")
    app.run(port=5000)

