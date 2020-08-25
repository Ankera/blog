//
//  duilie.h
//  C11
//
//  Created by yuyayong on 2020/3/5.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#ifndef duilie_h
#define duilie_h

#include <stdio.h>
#include <stdbool.h>

typedef struct Queue {
    int *pBase;
    int front;
    int rear;
} QUEUE;

// 初始化队列
void init_queue(QUEUE *);

// 追加元素
bool en_queue(QUEUE *, int);

// 队列是否慢
bool full_queue(QUEUE *);

// 遍历队列
void traverse_queue(QUEUE *);

// 出对
bool out_queue(QUEUE *, int *);

// 判断是否为空
bool empty_queue(QUEUE *);

void test_queue(void);

#endif /* duilie_h */
