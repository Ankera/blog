//
//  main.c
//  C11
//
//  Created by yuyayong on 2020/2/23.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <time.h>
#include "lian.h"
#include "zhan.h"
#include "duilie.h"
#include "erchashu.h"
#include "test1.h"

struct Arr {
    int *pBase;
    int len;
    int cnt; // 当前数组有效元素的数组个数
};

struct Student {
    char *name;
    int age;
};

typedef struct Student2{
    char *name;
    int age;
} *PSTU, STU; //PSTU是指针，STU是变量

void init_arr(struct Arr *, int len);
void show_arr(struct Arr *);
bool is_empty(struct Arr *);
bool is_full(struct Arr *);
bool append_arr(struct Arr *, int val);
bool insert_arr(struct Arr *, int pos, int val);
void inversion_arr(struct Arr *pArr);
void test(void);

int main(int argc, const char * argv[]) {
    
//    test();
//    testNode();
//    testZhan();
//    test_queue();
//    testBTree();
//    clock_t start, end;
//    start = clock();
//    an_test();
//    end = clock();
//    double d = ((double)(end-start));
//    printf("%f", d);
    
    return 0;
}

void init_arr (struct Arr *pArr, int length){
    pArr->pBase = (int *)malloc(sizeof(int) * length);
    if(pArr->pBase == NULL){
        printf("查询出错了\n");
        exit(-1);
    }else{
        pArr->len = length;
        pArr->cnt = 0;
    }
    return;
}

void show_arr(struct Arr *arr){
    if(is_empty(arr)){
        printf("数组为空\n");
    }else {
        for (int i = 0; i < arr->cnt; i++) {
            printf("第 %d 个元素 是 %d \n", i+1, arr->pBase[i]);
        }
    }
}

bool is_empty(struct Arr *arr){
    if(arr->len == 0){
        return true;
    }
    return false;
}


bool is_full(struct Arr *arr){
    if(arr->len == arr->cnt){
        return true;
    }
    return false;
}

bool append_arr (struct Arr *pArr, int val){
    // 数组满了返回false
    if(is_full(pArr)){
        return false;
    }
    
    pArr->pBase[pArr->cnt] = val;
    (pArr->cnt)++;
    return true;
}

bool insert_arr(struct Arr *arr, int pos, int val){
    
    if(is_full(arr)){
        return false;
    }
    
    if(pos < 1 || pos > ( arr->cnt) + 1 ){
        return false;
    }
    
    int i;
    for (i = (arr->cnt)-1; i >= pos -1; --i) {
        arr->pBase[i+1] = arr->pBase[i];
    }
    arr->pBase[pos-1] = val;
    arr->cnt++;
    return true;
}

void inversion_arr(struct Arr *pArr){
    int i = 0;
    int j = pArr->cnt - 1;
    int t;
    while (i < j) {
        t = pArr->pBase[i];
        pArr->pBase[i] = pArr->pBase[j];
        pArr->pBase[j] = t;
        i++;
        j--;
    }
    return;
}

void test(){
    // 指针变量指向结构体中xx变量的值
    struct Arr arr;
    init_arr(&arr, 10);
    append_arr(&arr, 1111);
    append_arr(&arr, 222);
    append_arr(&arr, 3333);
    insert_arr(&arr, 2, 5555);
    inversion_arr(&arr);
    show_arr(&arr);
}

