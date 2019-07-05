<template>
    <div>
        <form class="custom--form">
            <MyLabel msg="Username" for="username"/>
            <MyInput placeholder="Username..." type="text" name="username" required/>
            <MyLabel msg="Password" for="password"/>
            <MyInput placeholder="Password..." type="text" name="password" required/>
            <MyButton msg="Submit" :evt="clickEvent"/>
        </form>
    </div>
</template>
<script>
import MyLabel from './MyLabel'
import MyInput from './MyInput'
import MyButton from './MyButton'
export default {
    name: 'MyForm',
    components: {
        MyLabel,
        MyInput,
        MyButton,
    },
    methods: {
        clickEvent: function() {
            document.querySelectorAll(".input").forEach((input) => {
                if(!input.value) {
                    console.log("please type something");
                }
            }); 
        }
    },
}
</script>
<style>
.custom--form{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
