<template>
    <label class="label" :for="fr" >
        {{msg}}
    </label>
</template>
<script>
export default {
    name: 'MyLabel',
    props: {
        msg: String,
        fr: String,
    }
}
</script>
<style>
.label{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 50px;
}
</style>
