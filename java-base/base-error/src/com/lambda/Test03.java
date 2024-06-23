package com.lambda;

public class Test03 {
    public static void main(String[] args) {

        method(msg -> {
            String s = "GREGG";
            System.out.println(msg + s);
        });
    }

    public static void method(ShowOneParams showOneParams) {
        showOneParams.oneParams("这是一个参数GO-GO");
    }
}
