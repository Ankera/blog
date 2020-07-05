//
//  lian.h
//  C11
//
//  Created by yuyayong on 2020/3/4.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#ifndef lian_h
#define lian_h

#include <stdio.h>
#include <stdbool.h>
typedef struct Node {
    int data; // 数据
    struct Node * pNext;
} NODE, *PNODE;
// NODE 等价于 struct Node,    PNODE 等价于 struct Node *

void testNode(void);

// 创建一个非循环单链表
PNODE create_list(void);

// 循环遍历链表
void traverse_list(PNODE);

// 判断是否为空
bool is_empty_lian(PNODE);

// 获取链表长度
int length_list(PNODE);

// 在链表中插入值, 链表， 位置，插入的值
bool insert_list(PNODE, int, int);

// 删除链表中的值
bool delete_list(PNODE, int, int *);

// 给链表中的值排序
void sort_list(PNODE);

#endif /* lian_h */
