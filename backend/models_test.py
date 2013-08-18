from sqlalchemy import *
from database import Base

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    message = Column(String(255))

class Transaction(Base):
    __tablename__ = 'transaction'
    txnid = Column(Integer, primary_key=True)
    studentid = Column(Integer)
    vendorid = Column(Integer)
    txndatetime = Column(DateTime)
    txntype = Column(String(25))
    txndetail = Column(String(100))
    txnamount = Column(Float)
    balance = Column(Float)
