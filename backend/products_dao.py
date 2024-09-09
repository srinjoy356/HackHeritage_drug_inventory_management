from sql_connection import get_sql_connection
from datetime import date

def get_all_products(connection):
    cursor = connection.cursor()
    query = ("SELECT products.id, products.name, products.price_per_unit, uom_table.uom_name, products.quantity_of_uom, products.category, products.exp_date, products.shelf_num, products.picture_of_the_prod, products.description "
             "FROM products "
             "INNER JOIN uom_table ON products.uom_id = uom_table.uom_id;")
    cursor.execute(query)
    response = []
    for (id, name, price_per_unit, uom_name, quantity_of_uom, category, exp_date, shelf_num, picture_of_the_prod, description) in cursor:
        response.append({
            'product_id': id,
            'name': name,
            'price_per_unit': price_per_unit,
            'uom_name': uom_name,
            'quantity_of_uom': quantity_of_uom,
            'category': category,
            'exp_date': exp_date,
            'shelf_num': shelf_num,
            'picture_of_the_prod': picture_of_the_prod,
            'description': description
        })
    return response


def insert_new_product(connection, product, user_id):
    cursor = connection.cursor()
    query = ("INSERT INTO products "
             "(name, uom_id, price_per_unit, quantity_of_uom, category, exp_date, shelf_num, picture_of_the_prod, description, user_id) "
             "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
    data = (
        product['name'],
        product['uom_id'],
        product['price_per_unit'],
        product['quantity_of_uom'],
        product['category'],
        product['exp_date'],
        product['shelf_num'],
        product['picture_of_the_prod'],
        product['description'],
        user_id  # Adding the user_id to the insert query
    )

    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid


def delete_product(connection, product_id):
    cursor = connection.cursor()
    query = "DELETE FROM products WHERE id = %s"
    cursor.execute(query, (product_id,))
    connection.commit()

    return product_id  # Return the deleted product ID directly



def edit_product(connection, product_id, updated_product):
    cursor = connection.cursor()
    query = ("UPDATE products SET "
             "name = %s, "
             "price_per_unit = %s, "
             "quantity_of_uom = %s, "
             "category = %s, "
             "shelf_num = %s, "
             "description = %s "
             "WHERE id = %s")

    data = (
        updated_product['name'],
        updated_product['price_per_unit'],
        updated_product['quantity_of_uom'],
        updated_product['category'],
        updated_product['shelf_num'],
        updated_product['description'],
        product_id
    )

    cursor.execute(query, data)
    connection.commit()

    return cursor.rowcount

if __name__ == '__main__':
    connection = get_sql_connection()
    print(get_all_products(connection))
    print(insert_new_product(connection, {
        'name': "Aspirin",
        'uom_id': 1,
        'price_per_unit': 50,
        'quantity_of_uom': 100,
        'category': 'fever',
        'exp_date': date(2025, 4, 19),
        'shelf_num': 4,
        'description': 'description'
    }))

    # delete_product(connection, 3)