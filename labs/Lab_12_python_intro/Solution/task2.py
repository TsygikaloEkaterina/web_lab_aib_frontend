n = int(input())

X = list(map(lambda x: int(x), input().split(' ')))
medians = []

for i in len(X):
    X[:i+1]= sorted(X[:i+1])

    median = X[(i + 1) // 2] if (i + 1) % 2 == 1 else X[i // 2]

    medians.append(median)

sum = 0
for median in medians:
    sum += median
print(sum)