<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>ライザのアトリエ 1: 調合アイテムツリー</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          filled
          solo
          v-model="state.itemName"
          :items="itemNames"
          @change="updateQueryString"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels
          v-model="state.expansionPanels"
          multiple
          v-if="isEnable"
        >
          <v-expansion-panel>
            <v-expansion-panel-header color="green lighten-3"
              >ツリー</v-expansion-panel-header
            >
            <v-expansion-panel-content color="green lighten-5">
              <ul>
                <li v-for="(item, index) in tree" :key="index">
                  <v-breadcrumbs :items="item" divider="->" />
                </li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  SetupContext,
} from "@vue/composition-api";
import AllItems, { SynthesisItems } from "@/data/synthesisItems/one.json";

type Props = {
  name?: string;
};

type State = {
  itemName: string;
  expansionPanels: number[];
};

type BreadCrumb = {
  text: string;
};

export default defineComponent({
  props: {
    name: {
      type: String,
    },
  },
  setup(props: Props, context: SetupContext) {
    const firstName = props.name == null ? "" : props.name;
    const state = reactive<State>({
      itemName: firstName,
      expansionPanels: [0],
    });
    const itemNames = Object.keys(AllItems);
    const isEnable = computed(() => {
      return state.itemName.length > 0;
    });
    const sample = computed(() => {
      const a = [];
      for (let i = 0; i < 30; i++) {
        a.push({ text: "aaa" });
      }
      return a;
    });
    const trace_recipe = (
      name: string,
      need_item?: string,
      list?: BreadCrumb[][]
    ): BreadCrumb[][] => {
      if (list == null) list = [[]];
      const current_item = AllItems[name];
      const current_name = need_item == null ? name : `${name} (${need_item})`;
      const next_list = [[{ text: current_name }].concat(list[0])];
      if (current_item == null) return [[]];
      if (Object.keys(current_item.baseRecipes).length == 0) {
        return next_list;
      } else {
        const result = [];
        for (const x of Object.entries(current_item.baseRecipes)) {
          const next_name = x[0];
          const need_item = x[1];
          for (const y of trace_recipe(next_name, need_item, next_list)) {
            result.push(y);
          }
        }
        return result;
      }
    };
    const tree = computed(() => {
      if (state.itemName.length == 0) return [];
      return trace_recipe(state.itemName);
    });
    const updateQueryString = (a: string) => {
      context.root.$router.push({
        path: context.root.$route.path,
        query: {
          name: a,
        },
      });
    };
    return {
      state,
      itemNames,
      isEnable,
      sample,
      tree,
      updateQueryString,
    };
  },
});
</script>
