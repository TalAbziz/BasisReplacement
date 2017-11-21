﻿math.import({
    invGF: function invGF(M, n) {
        if (math.detGF(M,n) == 0) {
            throw 'error det = 0'
        }
        var A = math.clone(M);
        var size = A.length;
        var I = math.eye(size)._data;
        for (var t = 0; t < 2; t++) {
            for (var i = 0; i < size - 1; i++) {
                //swap to have a leading 1
                if (A[i][i] != 1) {
                    for (var j = i + 1; j < size; j++) {
                        if (A[j][i] == 1) {
                            A.swap(i, j);
                            I.swap(i, j);
                            break;
                        }
                    }
                }
                //row operations
                for (var k = i + 1; k < size; k++) {
                    if (A[k][i] == 1) {
                        A[k] = math.mod(math.add(A[k], A[i]), n);
                        I[k] = math.mod(math.add(I[k], I[i]), n);
                    }
                }
            }
            
            
            A = math.transpose(A);
            I = math.transpose(I);
        }
        
        return I;
    },

    randGF: function (size, n) {
        return math.floor(math.random([size, size], 0, n));
    },

    randBasisGF: function (size, n) {
        var mat;
        do {
            mat = math.randGF(size, n);
        } while (math.detGF(mat,n) == 0);
        return mat;
    },

    transitionMatrixGF: function (A, B, n) {
        return math.mod(math.multiply(math.invGF(A,n),B),n);
    },

    detGF: function (A, n) {
        return math.mod(math.det(A), n);
    }

});
