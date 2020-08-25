//
//  zhan.c
//  C11
//
//  Created by yuyayong on 2020/3/5.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#include "zhan.h"
#include <stdlib.h>
#include <stdbool.h>

// 栈的特点：先进先出
void init_stack(PSTACK pS) {
    pS->pTop = (PNODE2)malloc(sizeof(NODE2));
    if(pS->pTop == NULL){
        printf("栈内存分配失败");
        exit(-1);
    }else{
        pS->pBottom = pS->pTop;
        pS->pTop->pNext = NULL;
    }
}

// 压入栈，val是压入的数据
void push_stack(PSTACK pS, int val){
    PNODE2 pNew = (PNODE2)malloc(sizeof(NODE2));
    pNew->data = val;
    pNew->pNext = pS->pTop;
    pS->pTop = pNew;
    return;
}

// 遍历栈
void traverse_stack(PSTACK pS){
    PNODE2 p = pS->pTop;
    while (p != pS->pBottom) {
        printf("%d  ",  p->data);
        p=p->pNext;
    }
    printf("\n");
    return;
}

bool pop_stack(PSTACK pS, int *pVal) {
    if(is_empty_zhan(pS)){
        return false;
    } else {
        PNODE2 r = pS->pTop;
        pVal = &(r->data);
        pS->pTop = r->pNext;
        free(r);
        r = NULL;
    }
    return true;
}

// 判断是否空栈
bool is_empty_zhan(PSTACK pS){
    if(pS->pTop == pS->pBottom){
        return true;
    } else {
        return false;
    }
}

void clear_stack(PSTACK pS) {
    if(is_empty_zhan(pS)){
        return;
    }else{
        PNODE2 p = pS->pTop;
        PNODE2 q = NULL;
        while (p != pS->pBottom) {
            q = p->pNext;
            free(p);
            p = q;
        }
        pS->pTop = pS->pBottom;
    }
}

void testZhan(void) {
    STACK s;
    init_stack(&s);
    push_stack(&s, 11);
    push_stack(&s, 22);
    push_stack(&s, 33);
    push_stack(&s, 44);
    traverse_stack(&s);
}
