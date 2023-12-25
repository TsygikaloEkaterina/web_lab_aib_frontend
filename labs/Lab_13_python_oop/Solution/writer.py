import xlsxwriter
from blocks import ParametrsBlock, PayersBlock, GeographyBlock, StatusBlock

class Writer:
    CLASSES = [
        ParametrsBlock,
        PayersBlock,
        GeographyBlock,
        StatusBlock
    ]

    def __init__(self, data):
        self.data = data

    def write_excel(self, output_file):
        workbook = xlsxwriter.Workbook(output_file)
        worksheet = workbook.add_worksheet()

        row = 0
        col = 0

        for blocks in self.CLASSES:
            block_instance = blocks(worksheet, row, col, self.data)
            block_instance.wr_header()
            block_instance.wr_data()

        workbook.close()