<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="state.isShowDrawer = true" />
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer"
        >Luciferous Ryza Tools</v-toolbar-title
      >
    </v-app-bar>
    <v-navigation-drawer v-model="state.isShowDrawer" absolute temporary>
      <v-list nav>
        <v-list-tem-group>
          <router-link to="/">
            <v-list-item>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-tem-group>
        <v-subheader>ライザ1</v-subheader>
        <v-list-item-group>
          <router-link
            v-for="(item, index) in pagesRyza1"
            :key="index"
            :to="item.path"
          >
            <v-list-item>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import { pagesRyza1 } from "@/data/pages";

type State = {
  isShowDrawer: boolean;
};

export default defineComponent({
  setup(_props, _context) {
    const state = reactive<State>({
      isShowDrawer: false,
    });
    return {
      state,
      pagesRyza1,
    };
  },
});
</script>
