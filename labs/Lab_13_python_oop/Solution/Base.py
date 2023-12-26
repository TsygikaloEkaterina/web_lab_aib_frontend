from abc import ABCMeta, abstractmethod

class BaseBlock(metaclass=ABCMeta):
    def __init__(self, ws, row, col, data):
        self.ws=ws
        self.row=row
        self.col=col
        self.data=data

    @abstractmethod
    def wr_header(self):
        pass

    @abstractmethod
    def wr_data(self):
        pass
