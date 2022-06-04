<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Tools of Atelier Of Ryza</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>概要</v-card-title>
          <v-card-text>
            <p>ライザのアトリエ攻略用に個人的に作成したサイトです。</p>
            <p>何かありましたら、次の場所に連絡を</p>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/sinofseven/tools-of-atelier-of-ryza"
                  >GitHubリポジトリ</a
                >
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/sinofseven"
                  >Twitterアカウント</a
                >
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>リンク</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-subtitle>ライザ 1</v-list-item-subtitle>
              <v-list-item-group>
                <router-link
                  v-for="(item, index) in pagesRyza1"
                  :key="index"
                  :to="item.path"
                >
                  <v-list-item>
                    <v-list-item-title v-text="item.name" />
                  </v-list-item>
                </router-link>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { pagesRyza1 } from "@/data/pages";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup(props, context) {
    return {
      pagesRyza1,
    };
  },
});
</script>
