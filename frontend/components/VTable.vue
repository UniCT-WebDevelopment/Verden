<template lang="pug">
  .flex.flex-col
    .overflow-x-auto
      .py-2.inline-block.min-w-full
        .overflow-hidden
          table.min-w-full
            thead.bg-white.border-b(
              class="dark:bg-gray-800 dark:border-gray-700"
            )
              tr
                th.text-sm.text-gray-900.px-6.py-4.text-left(class="dark:text-white" scope="col" v-for="name in keys")
                  span(v-if="name == 'id'") ID
                  span.capitalize(v-else) {{ replaceUnderscores(name) }}
                th.text-sm.text-gray-900.px-6.py-4.text-left(scope="col")
            tbody
              tr.bg-white.border-b.transition.duration-300.ease-in-out(
                class="hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700" v-for="field in fields"
              )
                td.px-6.py-4.whitespace-nowrap.text-sm.text-gray-900.truncate(class="dark:text-white" v-for="name in keys")
                  div.block.truncate(:class="{'max-w-100': !['id', 'created', 'updated'].includes(name)}")
                    span(v-if="isBool(field[name])")
                      svg(v-if="field[name]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-500")
                        path(stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5")
                      svg(v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500")
                        path(stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12")
                    span(v-else-if="name == 'avatar'")
                      .block(class="sm:flex")
                        nuxt-link.inline-block(:to="'/user/'+field.id" target="_blank")
                          user-avatar(:data="field")
                        a.text-red-500.ml-2.cursor-pointer(
                          title="Delete this avatar"
                          @click="deleteAvatar(field.id)"
                          v-if="field.avatar"
                        )
                          svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
                            path(stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0")


                    span(v-else-if="['author', 'user', 'resolved'].includes(name)")
                      nuxt-link.inline-block(:to="'/user/'+field[name].id" target="_blank")
                        user-avatar(:data="field[name]" v-if="field[name].username")
                    span(v-else-if="name == 'created' || name == 'updated'")
                      | {{ field[name]|moment("DD/MM/YYYY HH:mm") }}
                    span(v-else-if="name == 'likes'")
                      | {{ field.likes ? field.likes.length : 0 }}
                    span(v-else-if="name == 'model_id'")
                      nuxt-link.underline.text-green-500(:to="'/models/'+field.model_id" target="_blank")
                        | {{ field[name] }}
                    span(v-else :title="field[name]") {{ field[name] }}
                td.px-6.py-4.whitespace-nowrap.text-sm.text-gray-900(class="dark:text-white")
                  .flex
                    .mr-1(v-if="path")
                      nuxt-link(:to="path + field.id" target="_blank")
                        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
                          path(stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244")
                    .mr-1(v-if="editrow")
                      svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer" @click="handleEdit(field.id)")
                        path(stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125")
                    div(v-if="deleterow")
                      svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500 cursor-pointer" @click="handleDelete(field.id)")
                        path(stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0")

</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  props: ["keys", "fields", "path", "deleterow", "editrow"],
  components: {
    "user-avatar": UserAvatar,
  },
  methods: {
    replaceUnderscores(text) {
      return text.replaceAll("_", " ");
    },
    isBool(variable) {
      return typeof variable == "boolean";
    },
    handleDelete(id) {
      this.deleterow(id);
    },
    handleEdit(id) {
      this.editrow(id);
    },
    deleteAvatar(id) {
      this.$store.dispatch("users/deleteAvatar", id).then((response) => {
        if (response.status == 200) {
          this.$toast.success("Avatar has been removed");
        } else {
          this.$toast.error("Error removing");
        }
      });
    },
  },
};
</script>
