<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 style="display: inline-block">
          ライザのアトリエ 1: トラベルボトル パスワード
        </h2>
        <v-dialog v-model="state.isShowDialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="float-end" color="primary" v-bind="attrs" v-on="on"
              >source</v-btn
            >
          </template>
          <v-card>
            <v-card-title>Source</v-card-title>
            <v-card-text>
              <ul>
                <li v-for="(link, index) in source" :key="index">
                  <a target="_blank" :href="link" v-text="link" />
                </li>
              </ul>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="state.isShowDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <span>Search</span>
            <v-spacer />
            <v-text-field
              v-model="state.search"
              single-line
              hide-details
              clearable
            />
          </v-card-title>
          <v-data-table
            :items="state.recipes"
            :headers="headers"
            :search="state.search"
            items-per-page="-1"
            hide-default-footer
          >
            <template v-slot:[`item.items`]="{ item }">
              <ul>
                <li
                  v-for="(name, index) in item.items"
                  :key="index"
                  v-text="name"
                />
              </ul>
            </template>
            <template v-slot:[`item.enemies`]="{ item }">
              <ul>
                <li
                  v-for="(name, index) in item.enemies"
                  :key="index"
                  v-text="name"
                />
              </ul>
            </template>
            <template v-slot:[`item.annotations`]="{ item }">
              <ul>
                <li
                  v-for="(name, index) in item.annotations"
                  :key="index"
                  v-text="name"
                />
              </ul>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, reactive } from "@vue/composition-api";
import Data, { BottleRecipe } from "@/data/travelBottleRecipes/one.json";
import { DataTableHeader } from "vuetify";

type State = {
  isShowDialog: boolean;
  recipes: BottleRecipe[];
  search: string;
};

export default defineComponent({
  setup(props, context: SetupContext) {
    const source: string[] = [
      "https://wikiwiki.jp/ryza/%E6%8E%A1%E5%8F%96%E5%9C%B0%E8%AA%BF%E5%90%88",
      "https://appmedia.jp/atelier-ryza/3955525",
      "https://ds-can.com/atelier_ryza/other/password.html",
    ];
    const state = reactive<State>({
      isShowDialog: false,
      recipes: Data.recipes,
      search: "",
    });
    const headers: DataTableHeader[] = [
      {
        value: "password",
        text: "パスワード",
        sortable: false,
        align: "center",
      },
      { value: "level", text: "レベル", sortable: true, align: "end" },
      { value: "items", text: "採取アイテム", sortable: true, align: "start" },
      { value: "enemies", text: "魔物", sortable: true, align: "start" },
      { value: "annotations", text: "備考", sortable: false, align: "start" },
    ];
    return {
      state,
      source,
      headers,
    };
  },
});
</script>
