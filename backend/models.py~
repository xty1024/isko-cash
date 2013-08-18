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
    txnunitprice = Column(Numeric(precision=9, scale=6))
    txntotalamount = Column(Numeric(precision=9, scale=6))
    balance = Column(Numeric(precision=9, scale=6))

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
