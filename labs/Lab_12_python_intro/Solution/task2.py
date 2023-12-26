import heapq

def MedianOutcome(arrCount, arr):
    maxValue = [], minValue = [], outcome = 0
    for i in range(n):
        heapq.heappush(maxValue, -arr[i])
        heapq.heappush(minValue, -heapq.heappop(maxValue))

        if len(minValue) > len(maxValue):
            heapq.heappush(maxValue, -heapq.heappop(minValue))
        outcome -= maxValue[0]

    return outcome

arrCount, arr =int(input()), list(map(int, input().split()))
print(MedianOutcome(arrCount, arr))