<template>
    <input class="input" :placeholder="plholder" :type="type" :name="nm"/>
</template>
<script>
export default {
    name: 'MyInput',
    props: {
        type: String,
        plholder: String,
        nm: String
    }
}
</script>
<style>
.input{
    border: none;
    width: 200px;
    height: 30px;
    border-bottom: 2px solid black;
    font-size: 18px;
}

.input::placeholder {
    font-size: 18px;
}
</style>
