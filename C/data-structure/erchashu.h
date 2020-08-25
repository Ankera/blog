//
//  erchashu.h
//  C11
//
//  Created by yuyayong on 2020/3/6.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#ifndef erchashu_h
#define erchashu_h

#include <stdio.h>
typedef struct BTNode {
    char data;
    struct BTNode *pLchild;  // 指向左孩子
    struct BTNode *pRchild;  // 指向右孩子
} BTNODE, * PBTNODE;

// 创建二叉树
PBTNODE createBTree(void);

// 先序遍历
void PreTraverseTree(PBTNODE);

// 中序遍历
void InTraverseTree(PBTNODE);

// 后续遍历
void PostTraverseTree(PBTNODE);

// 测试二叉树
void testBTree(void);
#endif /* erchashu_h */
