<template>
    <li>
        <slot name="title"></slot>
        <ul>
            <slot name="default"></slot>
        </ul>
    </li>
</template>

<script>
export default {
    name: "el-submen",  
}
</script>