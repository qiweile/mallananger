<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">头部</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content bg-purple-light">嗯嗯嗯</div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple">发发发</div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">左侧
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-aside>
            <el-main>右侧

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
    }
</script>

<style>

</style>
