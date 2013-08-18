from sqlalchemy import *
from database import Base

class Transaction(Base):
    __tablename__ = 'transactions'
    txnid = Column(Integer, primary_key=True)
    studentid = Column(Integer)
    vendorid = Column(Integer)
    txndatetime = Column(DateTime)
    txntype = Column(String(25))
    txnitem = Column(String(50))
    txnquantity = Column(Integer)
    txnunitprice = Column(Integer)
    txntotalamount = Column(Integer)
    balance = Column(Integer)

    def __init__(self, studentid, vendorid, txndatetime, txntype, txnitem, txnquantity, txnunitprice, txntotalamount, balance):
      self.studentid = studentid
      self.vendorid = vendorid
      self.txndatetime = txndatetime
      self.txntype = txntype
      self.txnitem = txnitem
      self.txnquantity = txnquantity
      self.txnunitprice = txnunitprice
      self.txntotalamount = txntotalamount
      self.balance = balance

class Consumer(Base):
    __tablename__ = 'consumers'
    consumerid = Column(Integer, primary_key=True)
    studentid = Column(Integer)
    statusdate = Column(DateTime)
    status = Column(String(25))

    def __init__(self, studentid, statusdate, status):
      self.studentid = studentid
      self.statusdate = statusdate
      self.status = status

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    message = Column(String(255))
