package com.lambda;

public class Test02 {
    public static void main(String[] args) {

        method(() -> {
            System.out.println("这是一个没有参数的lambda标准格式");
        });


    }

    public static void method(ShowNoParams showNoParams) {
        showNoParams.noParams();
    }
}
