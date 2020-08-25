//
//  lian.c
//  C11
//
//  Created by yuyayong on 2020/3/4.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#include "lian.h"
#include <stdlib.h>
#include <stdbool.h>

PNODE create_list(void){
    PNODE pHead = NULL;
    int len;
    int val; // 用来临时存放用户输入的值
    
    pHead = (PNODE)malloc(sizeof(NODE));
    if(pHead == NULL){
        printf("头结点地址内存空间分配失败\n");
        exit(-1);
    }
    PNODE pTail = pHead;
    pTail->pNext = NULL;
    
    printf("请输入你需要生成链表的节点个数: len = \n");
    scanf("%d", &len);
    
    for (int i = 0; i < len; i++) {
        printf("请输入第%d个节点的值", i+1);
        scanf("%d", &val);
        PNODE pNew = (PNODE)malloc(sizeof(NODE));
        if(pNew == NULL){
            printf("头结点地址内存空间分配失败\n");
            exit(-1);
        }
        pNew->data = val;
        pTail->pNext = pNew;
        pNew->pNext = NULL;
        pTail = pNew;
    }
    return pHead;
}

void traverse_list(PNODE pHead){
    PNODE p = pHead->pNext;
    while (p != NULL) {
        printf("%d  ", p->data);
        p = p->pNext;
    }
    printf(" \n 链表输出完毕 \n");
}

bool is_empty_lian(PNODE pHead){
    if(pHead->pNext == NULL){
        return true;
    }
    return false;
}

int length_list(PNODE pHead) {
    int len = 0;
    PNODE p = pHead->pNext;
    while (p != NULL) {
        len++;
        p = p->pNext;
    }
    return len;
}

// 从小到大排序
void sort_list(PNODE pHead) {
    int temp;
    int i, j, len = length_list(pHead);
    PNODE p, q;
    for (i = 0,p = pHead->pNext; i < len-1; i++, p=p->pNext) {
        for (j = i+1, q = p->pNext; j < len; j++, q=q->pNext) {
            if(p->data > q->data){
                temp = p->data;
                p->data = q->data;
                q->data = temp;
            }
        }
    }
}

// 在pHead所指向的链表第 pos 个节点的前面插入一个新的节点，该节点 的值是 val; pos 从1开始
bool insert_list(PNODE pHead, int pos, int val) {
    int len = length_list(pHead);
    if(pos > len || pos < 1){
        printf("链表插入失败\n");
        return false;
    }
    
    PNODE p = pHead;
    int i = 0;
    while (p != NULL && i < pos -1  ) {
        p = p->pNext;
        i++;
    }
    
    PNODE pNew = (PNODE)malloc(sizeof(NODE));
    if(pNew == NULL){
        printf("动态分配内存失败\n");
        exit(-1);
        return  false;
    }
    pNew->data = val;
    PNODE q = p->pNext;
    p->pNext = pNew;
    pNew->pNext = q;
    return true;
}

bool delete_list(PNODE pHead, int pos, int *pVal) {
    PNODE p = pHead;
    int i = 0;
    while (p != NULL && i < pos - 1) {
        p = p->pNext;
        i++;
    }
    if(i > pos -1 || p->pNext == NULL){
        return false;
    }
    
    PNODE q = p->pNext;
    *pVal = q->data;
    
    // 删除p节点后
    p->pNext = p->pNext->pNext;
    free(q);
    q = NULL;
    return true;
}

void testNode(){
    printf("测试链表");
    
    PNODE pHead = NULL;
    int len = 0;
    pHead = create_list();
    if(is_empty_lian(pHead)){
        printf("链表为空 \n");
    }else{
        len = length_list(pHead);
        printf("链表的长度是 = %d \n", len);
    }
    
    traverse_list(pHead);
    insert_list(pHead, 2, 10086);
    
//    sort_list(pHead);
//    printf("排序后的数组\n");
    traverse_list(pHead);
    
    int val;
    if(delete_list(pHead, 3, &val)){
        printf("删除成功, 删除的值= %d \n", val);
    }else{
        printf("删除失败\n");
    }
    traverse_list(pHead);
}
