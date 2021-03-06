# Welcome to our simple demo server!
import json # This is a library for encoding objects into JSON
from flask import Flask, request # This the microframework library we'll use to build our backend.
import sqlalchemy
from models import Transaction, Consumer, Item, Message
from database import db_session, db_init
from datetime import datetime
from decimal import *

app = Flask(__name__)
db_init()

# Function that maps to HTTP GET requests
# Example: accessing localhost:8080/messages/1
# Used in RESTful services to get objects
# By default, if we don't specify a methods attribute
# the handlers only respond to GET
@app.route('/messages/<int:id>/', strict_slashes=False)
def get_message(id):
    try:
        message = db_session.query(Message).filter_by(id=id).one()
        return message.message
    except sqlalchemy.orm.exc.NoResultFound:
        return 'Message does not exist', 404

# Function that maps to HTTP GET requests
# Example: accessing localhost:8080/messages/
# Used in RESTful services to get objects
@app.route('/messages/', strict_slashes=False)
def index_message():
    messages = db_session.query(Message).all()
    jsonable = [{'id': msg.id, 'message': msg.message} for msg in messages]
    return json.dumps(jsonable)

# Function that maps to HTTP POST requests
# Example: submitting forms with method POST to localhost:8080/messages/
# Used in RESTful services to create new objects
@app.route('/messages/', methods=['POST'], strict_slashes=False)
def post_message():
    # Note: When using jQuery's methods (e.g. $.post or $.ajax) to send data,
    # use request.form instead. AngularJS's $http service uses request.json.
    message = request.json['message']
    msg = Message(message=message)
    db_session.add(msg)
    db_session.commit()
    return str(msg.id)
    
# Function that maps to HTTP PUT requests
# Example: submitting forms with method PUT to localhost:8080/messages/1
# Used in RESTful services to update objects
@app.route('/messages/<int:id>/', methods=['PUT'], strict_slashes=False)
def put_message(id):
    try:
        message = db_session.query(Message).filter_by(id=id).one()
        message.message = request.json['message'] # See note above about request.form
        db_session.add(message)
        db_session.commit()
        return 'Updated the message!'
    except sqlalchemy.orm.exc.NoResultFound:
        return 'Message does not exist', 404

# Function that maps to HTTP DELETE requests
# Example: submitting forms with method DELETE to localhost:8080/messages/1
# Used in RESTful services to delete objects
@app.route('/messages/<int:id>/', methods=['DELETE'], strict_slashes=False)
def delete_message(id):
    try:
        message = db_session.query(Message).filter_by(id=id).one()
        db_session.delete(message)
        db_session.commit()
        return 'Deleted the message!'
    except sqlalchemy.orm.exc.NoResultFound:
        return 'Message does not exist', 404


#####################################################################################################
#
#
# Function related to BALANCE INQUIRY
#
#
#####################################################################################################


@app.route('/balance/<int:studentid>/', strict_slashes=False)
def get_balance(studentid):
    try:
        lasttxn = db_session.query(Transaction).filter_by(studentid=str(studentid)).order_by(Transaction.txndatetime.desc()).first()        
        return 'Php ' + str(lasttxn.balance)
    except sqlalchemy.orm.exc.NoResultFound:
        return 'Transaction does not exist', 404

#####################################################################################################
#
#
# End of Function related to BALANCE INQUIRY
#
#
#####################################################################################################




#####################################################################################################
#
#
# Functions related to Monetary Transactions (RELOAD, PAYMENT)
#
#
#####################################################################################################


@app.route('/transaction/<int:vendorid>/', strict_slashes=False)
def get_availableitems(vendorid):
    items = db_session.query(Item).filter_by(vendorid=str(vendorid), availabletoday=True)
    jsonable = [{'itemid': itm.itemid, 'itemname': itm.itemname, 'itemdesc': itm.itemdesc, 'itemunitprice': str(itm.itemunitprice), 'itemunitmeasure': itm.itemunitmeasure} for itm in items]
    return json.dumps(jsonable)


@app.route('/transaction/<int:txnid>/', strict_slashes=False)
def get_transaction(txnid):
    try:
        transaction = db_session.query(Transaction).filter_by(txnid=txnid).one()        
        return str(transaction.studentid)
    except sqlalchemy.orm.exc.NoResultFound:
        return 'Transaction does not exist', 404


@app.route('/transaction/', methods=['POST'], strict_slashes=False)
def post_transaction():
    # Note: When using jQuery's methods (e.g. $.post or $.ajax) to send data,
    # use request.form instead. AngularJS's $http service uses request.json.
    studentid = request.json['studentid']
    consumer = db_session.query(Consumer).filter_by(studentid=studentid).one()
    if consumer.status == 'Active':
      vendorid = request.json['vendorid']
      txntype = request.json['txntype']
      txnitemid = request.json['txnitemid']
      txnquantity = request.json['txnquantity']
      txnunitprice = request.json['txnunitprice']
      txntotalamount = request.json['txntotalamount']
      lasttxn = db_session.query(Transaction).filter_by(studentid=studentid).order_by(Transaction.txndatetime.desc()).first()
      if txntype == 'Reload':
        balance = lasttxn.balance + Decimal(txntotalamount)
      else:
        balance = lasttxn.balance - Decimal(txntotalamount)
      txn = Transaction(studentid=studentid, vendorid=vendorid, txndatetime=datetime.utcnow(), txntype=txntype, txnitemid=txnitemid, txnquantity=Decimal(txnquantity), txnunitprice=txnunitprice, txntotalamount=txntotalamount, balance=balance)
      db_session.add(txn)
      db_session.commit()
      return str(txn.balance)
    else:
      return 'Consumer Status is :' + str(consumer.status)


#####################################################################################################
#
#
# End of Functions related to Monetary Transactions (RELOAD, PAYMENT)
#
#
#####################################################################################################



#####################################################################################################
#
#
# Beginning of Functions related to LOST CARD
#
#
#####################################################################################################


@app.route('/lostcard/<int:studentid>/', strict_slashes=False)
def get_consumer(studentid):
    try:
        consumer = db_session.query(Consumer).filter_by(studentid=studentid).one()        
        return str(consumer.status)
    except sqlalchemy.orm.exc.NoResultFound:
        return 'Consumer does not exist', 404


@app.route('/lostcard/<int:studentid>/', methods=['PUT'], strict_slashes=False)
def put_consumer(studentid):
    try:
        consumer = db_session.query(Consumer).filter_by(studentid=studentid).one()
        consumer.status = request.json['status'] # See note above about request.form
        consumer.statusdate = datetime.utcnow()
        db_session.add(consumer)
        db_session.commit()
        return str(consumer.status)
    except sqlalchemy.orm.exc.NoResultFound:
        return 'Consumer does not exist', 404


#####################################################################################################
#
#
# End of Functions related to LOST CARD
#
#
#####################################################################################################


#####################################################################################################
#
#
# Beginning of Functions related to ITEMS
#
#
#####################################################################################################


@app.route('/item/<int:vendorid>/', strict_slashes=False)
def get_items(vendorid):
    items = db_session.query(Item).filter_by(vendorid=str(vendorid))
    jsonable = [{'itemid': itm.itemid, 'itemname': itm.itemname, 'itemdesc': itm.itemdesc, 'itemunitprice': str(itm.itemunitprice), 'itemunitmeasure': itm.itemunitmeasure, 'availabletoday': itm.availabletoday} for itm in items]
    return json.dumps(jsonable)


@app.route('/item/', methods=['POST'], strict_slashes=False)
def post_item():
    vendorid = request.json['vendorid']
    itemname = request.json['itemname']
    itemdesc = request.json['itemdesc']
    itemunitprice = request.json['itemunitprice']
    itemunitmeasure = request.json['itemunitmeasure']
    item = Item(vendorid=vendorid, itemname=itemname, itemdesc=itemdesc, itemunitprice=itemunitprice, itemunitmeasure=itemunitmeasure)
    db_session.add(item)
    db_session.commit()
    return str(item.itemid)


@app.route('/item/<int:itemid>/', methods=['PUT'], strict_slashes=False)
def put_item(itemid):
    try:
        item = db_session.query(Item).filter_by(itemid=itemid).one()
        item.availabletoday = request.json['availabletoday'] # See note above about request.form
        db_session.add(item)
        db_session.commit()
        return item.itemname
    except sqlalchemy.orm.exc.NoResultFound:
        return 'Item does not exist', 404


#####################################################################################################
#
#
# End of Functions related to ITEMS
#
#
#####################################################################################################


if __name__ == '__main__':
    print 'Listening on port 8080...'
    app.run(host='0.0.0.0', port=8080, debug=True)
