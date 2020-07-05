//
//  zhan.h
//  C11
//
//  Created by yuyayong on 2020/3/5.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#ifndef zhan_h
#define zhan_h

#include <stdio.h>
#include <stdbool.h>

typedef struct Node2 {
    int data;
    struct Node2 *pNext;
} *PNODE2, NODE2;

typedef struct Stack {
    PNODE2 pTop;
    PNODE2 pBottom;
} STACK, *PSTACK;

// 初始化栈
void init_stack(PSTACK);

// 加入栈
void push_stack(PSTACK, int);

// 遍历栈
void traverse_stack(PSTACK);

// 出栈
bool pop_stack(PSTACK, int *);

// 判断是否空栈
bool is_empty_zhan(PSTACK);

// 清空栈
void clear_stack(PSTACK);

// 测试栈
void testZhan(void);

#endif /* zhan_h */
