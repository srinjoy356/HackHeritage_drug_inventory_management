from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import mysql.connector
import json

import products_dao
import orders_dao
import uom_dao

app = Flask(__name__)

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
    product_id = products_dao.insert_new_product(connection, request_payload)
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


if __name__ == "__main__":
    print("Starting Python Flask Server For Drug Inventory Management System")
    app.run(port=5000)

