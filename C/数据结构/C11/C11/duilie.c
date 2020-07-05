//
//  duilie.c
//  C11
//
//  Created by yuyayong on 2020/3/5.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#include "duilie.h"
#include <stdlib.h>
#include <stdbool.h>

void init_queue(QUEUE *pQ) {
    pQ->pBase = (int *)malloc(sizeof(QUEUE) * 6);
    pQ->front = pQ->rear = 0;
    return;
};

bool full_queue(QUEUE *pQ) {
    if((pQ->rear+1)%6 == (pQ->front)){
        return true;
    }
    return false;
};

bool en_queue(QUEUE *pQ, int val) {
    if(full_queue(pQ)){
        return false;
    } else {
        pQ->pBase[pQ->rear] = val;
        pQ->rear = (pQ->rear+1) % 6;
        return true;
    }
};

void traverse_queue(QUEUE *pQ){
    int i = pQ->front;
    while (i != pQ->rear) {
        printf("%d  ", pQ->pBase[i]);
        i = (i + 1) % 6;
    }
    printf("\n");
    return;
};

bool empty_queue(QUEUE *pQ){
    if(pQ->front == pQ->rear){
        return true;
    }else {
        return false;
    }
}

bool out_queue(QUEUE *pQ, int *pVal){
    if(empty_queue(pQ)){
        printf("队列是空的\n");
        return false;
    } else {
        *pVal = pQ->pBase[pQ->front];
        pQ->front = (pQ->front+1) % 6;
        return true;
    }
}

void test_queue(){
    QUEUE q;
    init_queue(&q);
    en_queue(&q, 111);
    en_queue(&q, 222);
    en_queue(&q, 333);
    en_queue(&q, 444);
    
    int val;
    out_queue(&q, &val);
    traverse_queue(&q);
    printf("出对的元素 %d \n", val);
    
}


