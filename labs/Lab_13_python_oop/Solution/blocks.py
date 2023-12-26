from datetime import datetime

from base import BaseBlock


class ParametrsBlock(BaseBlock):
    NAME = 'ПАРАМЕТРЫ ЗАПРОСА'
    DATE = 'Дата выгрузки'
    PERIOD = 'Период, за который сделана выгрузка'

    def wr_header(self):
        self.ws.write(self.row,self.col,self.NAME) #00

    def wr_data(self):
        self.row+=1
        self.ws.write(self.row,self.col,self.DATE) #10

        self.col+=1
        date = datetime.now().strftime('%d.%m.%Y')
        self.ws.write(self.row,self.col,date) #11

        self.col-=1
        self.row+=1
        self.ws.write(self.row,self.col,self.PERIOD) #20

        self.col+=1
        dates = [payment['created_at'] for payment in self.data['payments']]
        dates = [datetime.fromisoformat(date[:-1]) for date in dates]
        dates.sort()
        date_low_str = dates[0].strftime('%d-%m-%Y')
        date_upp_str = dates[-1].strftime('%d-%m-%Y')
        date = f'{date_low_str} - {date_upp_str}'
        self.ws.write(self.row,self.col,date) #21

        self.col=0
        self.row+=2


class PayersBlock(BaseBlock):
    NAME = 'ОТЧЕТ ПО АКТИВНОСТИ КЛИЕНТОВ'
    TOP = 'Топ 10 клиентов'

    def wr_header(self):
        self.row=5
        self.col=0
        self.ws.write(self.row,self.col,self.NAME)
        self.row+=1
        self.ws.write(self.row,self.col,self.TOP)
        self.col+=1

    def wr_data(self):
        clients_payments = []
        for client in self.data['clients']:
            for payment in self.data['payments']:
                if client['id'] == payment['client_id']:
                    clients_payments.append({
                        'fio': client['fio'],
                        'payment_amount': payment['amount'],
                        'payment_created_at': payment['created_at']
                    })

        clients_payments.sort(key=lambda x: datetime.fromisoformat(x['payment_created_at']),reverse=True)

        quarters = {}
        for client_payment in clients_payments:
            payment_date = datetime.fromisoformat(client_payment['payment_created_at'])
            q = f'Q{(payment_date.month%4 + 1)} {payment_date.year}'
            quarters.setdefault(q,[]).append({
                'fio':client_payment['fio'],
                'payment_amount':client_payment['payment_amount']
                })

        for q in quarters:
            self.ws.write(self.row,self.col,q)
            srt = sorted(quarters[q], key=lambda x:x['payment_amount'])[:10]
            for s in srt:
                self.row+=1
                self.ws.write(self.row,self.col,s['fio'])#последний на 16 строке
            self.row-=10
            self.col+=1


class GeographyBlock(BaseBlock):
    NAME = 'ГЕОГРАФИЯ КЛИЕНТОВ'
    STATISTIC = 'Статистика распределения клиентов'
    CITY = 'Города'
    AMOUNT = 'Kоличество клиентов'

    def wr_header(self):
        self.col=0
        self.row=19
        self.ws.write(self.row,self.col,self.NAME)
        self.row+=1
        self.ws.write(self.row,self.col,self.STATISTIC)
        self.col+=1
        self.ws.write(self.row,self.col,self.CITY)
        self.col+=1
        self.ws.write(self.row,self.col,self.AMOUNT)
        self.col=1
        self.row+=1

    def wr_data(self):
        cities={}
        for client in self.data['clients']:
            city = client['city']
            if city in cities:
                cities[city]+=1
            else:
                cities[city]=1

        sort_cities = sorted(cities.items(), key=lambda x: x[1], reverse=True)

        for city, count in sort_cities[:10]:
            self.ws.write(self.row,self.col,city)
            self.col+=1
            self.ws.write(self.row,self.col,count)#на 30й строке
            self.col-=1
            self.row+=1


class StatusBlock(BaseBlock):
    NAME = 'АНАЛИЗ СОСТОЯНИЯ СЧЕТА'
    STATISTIC = 'Статистика состояния счета'
    CLIENT = 'Клиент'
    STATE = 'Состояние счета'
    DEBT = 'Задолженность'
    PROFIT = 'Прибыль'

    def wr_header(self):
        self.col=0
        self.row=33
        self.ws.write(self.row,self.col,self.NAME)
        self.ws.merge_range('A35:A36',self.STATISTIC)
        self.ws.merge_range('B35:C35',self.DEBT)
        self.ws.merge_range('E35:D35',self.PROFIT)
        self.col+=1
        self.row+=2
        self.ws.write(self.row,self.col,self.CLIENT)
        self.col+=1
        self.ws.write(self.row,self.col,self.STATE)
        self.col+=1
        self.ws.write(self.row,self.col,self.CLIENT)
        self.col+=1
        self.ws.write(self.row,self.col,self.STATE)

    def wr_data(self):
        self.col=1
        self.row=36

        status = []
        for client in self.data['clients']:
            for payment in self.data['payments']:
                if client['id'] == payment['client_id']:
                    status.append({
                        'fio': client['fio'],
                        'payment_amount': payment['amount'],
                    })

        status.sort(key=lambda x:x['payment_amount'],reverse=True)

        for s in status[-10:]:
            self.ws.write(self.row,self.col,s['fio'])
            self.col+=1
            self.ws.write(self.row,self.col,s['payment_amount'])
            self.col-=1
            self.row+=1

        self.col=3
        self.row=36

        for s in status[:10]:
            self.ws.write(self.row,self.col,s['fio'])
            self.col+=1
            self.ws.write(self.row,self.col,s['payment_amount'])
            self.col-=1
            self.row+=1