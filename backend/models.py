from sqlalchemy import *
from database import Base

class Transaction(Base):
    __tablename__ = 'transactions'
    txnid = Column(Integer, primary_key=True)
    studentid = Column(Integer)
    vendorid = Column(Integer)
    txndatetime = Column(DateTime)
    txntype = Column(String(25))
    txnitemid = Column(Integer)
    txnquantity = Column(Numeric(precision=9, scale=6))
    txnunitprice = Column(Numeric(precision=9, scale=6))
    txntotalamount = Column(Numeric(precision=9, scale=6))
    balance = Column(Numeric(precision=9, scale=6))

class Consumer(Base):
    __tablename__ = 'consumers'
    consumerid = Column(Integer, primary_key=True)
    studentid = Column(Integer)
    statusdate = Column(DateTime)
    status = Column(String(25))

class Item(Base):
    __tablename__ = 'items'
    itemid = Column(Integer, primary_key=True)
    vendorid = Column(String(9))
    itemname = Column(String(50))
    itemdesc = Column(String(100))
    itemunitprice = Column(Numeric(precision=9, scale=6))
    itemunitmeasure = Column(String(50))
    availabletoday = Column(Boolean, unique=False, default=False)

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    message = Column(String(255))
