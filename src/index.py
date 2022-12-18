# 9
# add
# for 43
# end
# for 10
# for 15
# add
# end
# add
# end


a = ['9', 'add', 'for 43', 'end', 'for 2', 'for 2', 'add', 'end', 'add', 'end']


b = int( a[2].split()[1])
print(b)
x = 0

def fn(x): 
    for i in range( 1, int(a[0])):
        if 'for' in a[i] and a[i+1] == 'end':
            continue
        elif a[i] == 'end':
            continue
        elif a[i] == 'add':
            if (a[i +1] == 'end'):
                continue
            else: 
             x = x +1
        else:
            # for the nested loop
            for j in range( int(a[i].split()[1])): #get the second el
                #
                if(a[i +1] == 'add'):
                    continue
                else:
                    for k in range(int(a[i+1].split()[1])):
                        x = x +1
                x = x + 1
    return x

            
print(fn(x))




