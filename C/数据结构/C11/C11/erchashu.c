//
//  erchashu.c
//  C11
//
//  Created by yuyayong on 2020/3/6.
//  Copyright © 2020 yuyayong. All rights reserved.
//

#include "erchashu.h"
#include <stdlib.h>
#include <stdbool.h>

PBTNODE createBTree(void) {
//    struct BTNode bt;
    PBTNODE pA = (PBTNODE)malloc(sizeof(BTNODE));
    PBTNODE pB = (PBTNODE)malloc(sizeof(BTNODE));
    PBTNODE pC = (PBTNODE)malloc(sizeof(BTNODE));
    PBTNODE pD = (PBTNODE)malloc(sizeof(BTNODE));
    PBTNODE pE = (PBTNODE)malloc(sizeof(BTNODE));
    pA->data = 'A';
    pB->data = 'B';
    pC->data = 'C';
    pD->data = 'D';
    pE->data = 'E';
    pA->pLchild = pB;
    pA->pRchild = pC;
    pB->pLchild = pB->pRchild = NULL;
    pC->pLchild = pD;
    pC->pRchild = NULL;
    pD->pLchild = NULL;
    pD->pRchild = pE;
    pE->pLchild = pE->pRchild = NULL;
    return pA;
}

// 先序遍历
void PreTraverseTree(PBTNODE pT) {
    if(pT != NULL){
        printf("%c  ", pT->data);
        if(pT != NULL){
            PreTraverseTree(pT->pLchild);
        }
        if(pT != NULL){
            PreTraverseTree(pT->pRchild);
        }
    }
}

// 中序遍历
void InTraverseTree(PBTNODE pT) {
    if(pT != NULL){
        if(pT != NULL){
            InTraverseTree(pT->pLchild);
        }
        printf("%c  ", pT->data);
        if(pT != NULL){
            InTraverseTree(pT->pRchild);
        }
    }
}

// 后续遍历
void PostTraverseTree(PBTNODE pT) {
    if(pT != NULL){
        if(pT != NULL){
            PostTraverseTree(pT->pLchild);
        }
        
        if(pT != NULL){
            PostTraverseTree(pT->pRchild);
        }
        printf("%c  ", pT->data);
    }
}

void testBTree(void) {
    PBTNODE pT = createBTree();
    printf("先序遍历\n");
    PreTraverseTree(pT);
    printf("\n");
    printf("中序遍历\n");
    InTraverseTree(pT);
    printf("\n");
    printf("后序遍历\n");
    PostTraverseTree(pT);
    printf("\n");
}
