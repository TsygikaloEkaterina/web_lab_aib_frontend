def countRoutes(N, M):
    dp = [[0]*M for _ in range(N)]
    dp[0][0] = 1

    for i in range(N):
        for j in range(M):
            if i - 2 >= 0 and j - 1 >= 0:
                dp[i][j] += dp[i - 2][j - 1]
            if j - 2 >= 0 and i - 1 >= 0:
                dp[i][j] += dp[i - 1][j - 2]

    return dp[N - 1][M - 1]


N = int(input())
M = int(input())

result = countRoutes(N, M)
print(result)