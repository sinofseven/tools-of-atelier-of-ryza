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
                  <v-breadcrumbs
                    :items="convertToBreadCrumbs(item)"
                    divider="->"
                  />
                </li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel v-for="(list, index) in tree" :key="index">
            <v-expansion-panel-header color="blue lighten-3">
              <v-breadcrumbs divider="->" :items="convertToBreadCrumbs(list)" />
            </v-expansion-panel-header>
            <v-expansion-panel-content color="blue lighten-5">
              <v-list style="margin-top: 0.8rem">
                <v-list-item-group>
                  <v-list-item
                    v-for="(name, nameIndex) in calcSourceItems(list)"
                    :key="nameIndex"
                    @click.stop="showDialog(name)"
                  >
                    <v-list-item-title v-text="name" />
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-dialog v-model="state.dialog.isShow">
          <v-card>
            <v-card-title> {{ state.dialog.name }}の調合素材 </v-card-title>
            <v-card-text>
              <v-list>
                <v-subheader v-if="state.dialog.defaultCategories.length > 0"
                  >Default</v-subheader
                >
                <v-list-item-group
                  v-if="state.dialog.defaultCategories.length > 0"
                >
                  <v-list-item
                    v-for="(name, index) in state.dialog.defaultCategories"
                    :key="index"
                  >
                    <v-list-item-title v-text="name" />
                  </v-list-item>
                </v-list-item-group>
                <v-subheader v-if="state.dialog.optionalCategories.length > 0"
                  >Optional</v-subheader
                >
                <v-list-item-group
                  v-if="state.dialog.optionalCategories.length > 0"
                >
                  <v-list-item
                    v-for="(name, index) in state.dialog.optionalCategories"
                    :key="index"
                  >
                    <v-list-item-title v-text="name" />
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-dialog>
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

type Dialog = {
  isShow: boolean;
  name: string;
  defaultCategories: string[];
  optionalCategories: string[];
};

type State = {
  itemName: string;
  expansionPanels: number[];
  dialog: Dialog;
};

type TreeNode = {
  itemName: string;
  needItemName?: string;
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
      expansionPanels: [0, 1, 2, 4, 5, 6, 7, 8, 9],
      dialog: {
        isShow: false,
        name: "",
        defaultCategories: [],
        optionalCategories: [],
      },
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
    const traceRecipe = (item: TreeNode, list?: TreeNode[][]): TreeNode[][] => {
      if (list == null) list = [[]];
      const currentItem = AllItems[item.itemName];
      if (currentItem == null) return [[]];
      const nextList = [[item].concat(list[0])];
      if (Object.keys(currentItem.baseRecipes).length == 0) {
        return nextList;
      } else {
        const result = [];
        for (const x of Object.entries(currentItem.baseRecipes)) {
          const nextNode: TreeNode = {
            itemName: x[0],
            needItemName: x[1],
          };
          for (const y of traceRecipe(nextNode, nextList)) {
            result.push(y);
          }
        }
        return result;
      }
    };
    const convertToBreadCrumbs = (list: TreeNode[]): BreadCrumb[] => {
      return list.map((item) => {
        let text = item.itemName;
        if (item.needItemName != null) {
          text += ` (${item.needItemName})`;
        }
        return {
          text,
        };
      });
    };
    const tree = computed(() => {
      if (state.itemName.length == 0) return [];
      return traceRecipe({ itemName: state.itemName });
    });
    const calcSourceItems = (list: TreeNode[]): string[] => {
      let union: Set<string> = new Set();
      for (const node of list) {
        const item = AllItems[node.itemName];
        if (node.needItemName != null) union.add(node.needItemName);
        union = new Set([...union, ...item.sourceItems]);
      }
      return [...union].sort();
    };
    const updateQueryString = (a: string) => {
      context.root.$router.push({
        path: context.root.$route.path,
        query: {
          name: a,
        },
      });
    };
    const showDialog = (category: string) => {
      if (category[0] !== "(") return;
      state.dialog.name = category;
      state.dialog.defaultCategories = [];
      state.dialog.optionalCategories = [];
      for (const item of Object.values(AllItems)) {
        if (item.categories.have.includes(category))
          state.dialog.defaultCategories.push(item.name);
        else if (item.categories.optional.includes(category))
          state.dialog.optionalCategories.push(item.name);
      }
      if (
        state.dialog.defaultCategories.length > 0 ||
        state.dialog.optionalCategories.length > 0
      )
        state.dialog.isShow = true;
    };
    return {
      state,
      itemNames,
      isEnable,
      sample,
      tree,
      updateQueryString,
      convertToBreadCrumbs,
      calcSourceItems,
      showDialog,
    };
  },
});
</script>
