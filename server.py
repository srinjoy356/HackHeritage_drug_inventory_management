from flask import Flask, request, jsonify, session
from sql_connection import get_sql_connection
import mysql.connector
import json

import hashlib

import sign_up
import log_in

import products_dao
import orders_dao
import uom_dao
from flask_cors import CORS




app = Flask(__name__)

CORS(app)

app.secret_key = 'your_secret_key'

connection = get_sql_connection()

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
    order_id = request_payload['order_id']  # Ensure the order ID is included in the payload
    updated_order_id = orders_dao.update_order(connection, order_id, request_payload)
    response = jsonify({
        'order_id': updated_order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    return_id = products_dao.delete_product(connection, request.form['product_id'])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/editProduct', methods=['POST'])
def edit_product():
    # Parse the JSON data sent in the POST request
    request_payload = json.loads(request.form['data'])

    # Extract the product_id and the updated product details from the payload
    product_id = request_payload['product_id']
    updated_product = {
        'name': request_payload['name'],
        'price_per_unit': request_payload['price_per_unit'],
        'quantity_of_uom': request_payload['quantity_of_uom'],
        'category': request_payload['category'],
        'exp_date': request_payload['exp_date'],
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


if __name__ == "__main__":
    print("Starting Python Flask Server For Drug Inventory Management System")
    app.run(port=5000, debug=True)

