import sys


if __name__ == "__main__":
    if len(sys.argv) < 3:
        exit(1)

    with open('results/'+sys.argv[2]+'.txt', 'w') as f:
        f.write("this is a test for "+ sys.argv[0] + sys.argv[1] + sys.argv[2] )