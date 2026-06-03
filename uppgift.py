def swap(lst, i, j):
    temp = lst[i]
    lst[i] = lst[j]
    lst[j] = temp

lst = [4, 8, 2, 6]
print(f"Listan före platsbytet: {lst}")
swap(lst, 2, 0)
swap(lst, 1, 3)
swap(lst, 1, 2)

print(f"Listan efter platsbytet: {lst}")