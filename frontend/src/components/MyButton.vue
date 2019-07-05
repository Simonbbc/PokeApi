<template>
    <button type="Submit" class="custom--button" @click="evt">
        {{msg}}
    </button>
</template>
<script>
export default {
    name: 'MyButton',
    props: {
        msg: String,
        evt: Function,
    }
}
</script>
<style>
.custom--button {
    width: 120px;
    height: 40px;
    background-color: rgb(0, 128, 6);
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: none;
    border-radius: 50px;
    margin-top: 30px;
    transition: box-shadow 1s;
    box-shadow: none;
    cursor: pointer;
}

.custom--button:hover {
    transition: box-shadow 1s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
