<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Models
    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="openPreview")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-10.overflow-y-auto
        .flex.min-h-full.items-center.justify-center.p-4.text-center
          .relative.transform.overflow-hidden.rounded-lg.bg-white.shadow-xl.transition-all(class="w-10/12 sm:w-8/12")
            file-preview(:path="openPreview" controls="1")
            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6")
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="openPreview = null"
              ) Close
    .relative.z-9(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxEditModel > 0")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-9.overflow-y-auto
        .flex.min-h-full.items-end.justify-center.p-4.text-center(class="sm:items-center sm:p-0")
          .relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl.transition-all(
            class="sm:my-8 sm:w-full sm:max-w-lg dark:bg-gray-800"
          )
            h3.text-xl.font-bold.text-center.p-5(class="dark:text-white") Edit model
            form.m-3
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="name") Name
                .mt-1
                  input#name.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="name"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    placeholder="John Doe"
                    v-model="form.name"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="description") Description
                  span.text-gray-300 (Optional)
                .mt-1
                  input#description.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="description"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.description"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="duration") Duration
                .mt-1
                  input#duration.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="duration"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.duration"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="height") Height
                .mt-1
                  input#height.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="height"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.height"
                  )

              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="weight") Weight
                .mt-1
                  input#weight.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="weight"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.weight"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="printer") Printer
                  span.text-gray-300 (Optional)
                .mt-1
                  input#printer.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="printer"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.printer"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="material") Material
                  span.text-gray-300 (Optional)
                .mt-1
                  input#material.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="material"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.material"
                  )

            hr
            .my-4.mx-3
              h4(class="dark:text-white") See and/or remove files
              ul.divide-y.divide-gray-200.rounded-md.border.border-gray-200(class="dark:border-gray-500 dark:divide-gray-500 dark:text-white" role="list" v-if="form.uploads")
                li.flex.items-center.justify-between.py-3.pl-3.pr-4.text-sm(v-for="upload in form.uploads" :key="upload.id")
                  .flex.w-0.flex-1.items-center
                    svg.h-5.w-5.flex-shrink-0.text-gray-400(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
                      path(fill-rule="evenodd", d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z", clip-rule="evenodd")
                    span.ml-2.w-0.flex-1.truncate {{ getFileName(upload.filepath) }}
                  .ml-4
                    a.font-medium.text-black-700.cursor-pointer.mr-2(class="hover:underline" @click="openPreview = upload.filepath") Preview
                    a.font-medium.text-red-700.cursor-pointer(class="hover:underline dark:text-red-500" @click="boxDeleteModelUpload = upload.id") Delete

            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700")
              button.inline-flex.w-full.justify-center.rounded-md.border.border-transparent.bg-green-600.px-4.py-2.text-base.font-medium.text-white.shadow-sm(
                type="button"
                :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm': true, 'opacity-25 cursor-default': isLoading}"
                :disabled="isLoading"
                :readonly="isLoading"
                @click="saveModel"
              )
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                | Save
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="boxEditModel = 0"
              ) Cancel
    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxDeleteModel > 0")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-10.overflow-y-auto
        .flex.min-h-full.items-end.justify-center.p-4.text-center(class="sm:items-center sm:p-0")
          .relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl.transition-all(class="sm:my-8 sm:w-full sm:max-w-lg")
            .bg-white.px-4.pt-5.pb-4(class="sm:p-6 sm:pb-4")
              div(class="sm:flex sm:items-start")
                .mx-auto.flex.h-12.w-12.flex-shrink-0.items-center.justify-center.rounded-full.bg-red-100(class="sm:mx-0 sm:h-10 sm:w-10")
                  svg.h-6.w-6.text-red-600(xmlns="http://www.w3.org/2000/svg", fill="none", viewbox="0 0 24 24", stroke-width="1.5", stroke="currentColor", aria-hidden="true")
                    path(stroke-linecap="round", stroke-linejoin="round", d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z")
                .mt-3.text-center(class="sm:mt-0 sm:ml-4 sm:text-left")
                  h3#modal-title.text-lg.font-medium.leading-6.text-gray-900 Are you sure?
                  .mt-2
                    p.text-sm.text-gray-500
                      | Model data and all of the files will be deleted. This action cannot be undone.
            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6")
              button.inline-flex.w-full.justify-center.rounded-md.border.border-transparent.bg-red-600.px-4.py-2.text-base.font-medium.text-white.shadow-sm(
                type="button"
                :class="{'hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm': true, 'opacity-25 cursor-default': isLoading}"
                :disabled="isLoading"
                :readonly="isLoading"
                @click="deleteModel"
              )
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                | Yes, confirm
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="boxDeleteModel = 0"
              ) Cancel
    .flex.flex-col.grid-cols-6.mt-3(class="sm:grid")
      div
        admin-sidebar
      section#tables.col-span-5
        v-table(
          :keys="['id', 'name', 'created', 'author', 'likes']"
          :fields="models"
          path="/models/"
          :deleterow="openModal"
          :editrow="openEditModal"
        )
        pagination(:page="page" :pages="pages" v-if="count" path="/admin/models")
</template>

<script>
import { mapGetters } from "vuex";

import AdminSidebar from "@/components/AdminSidebar.vue";
import FilePreview from "@/components/FilePreview.vue";
import Pagination from "@/components/Pagination.vue";
import VTable from "@/components/VTable.vue";

export default {
  name: "AdminView",
  head: { title: "Models · Verden" },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged", "me"]),
    ...mapGetters("models", ["models", "count"]),
  },
  data() {
    return {
      page: 0,
      pages: 0,
      boxDeleteModel: 0,
      boxEditModel: 0,
      form: {},
      openPreview: null,
    };
  },
  components: {
    AdminSidebar,
    "file-preview": FilePreview,
    pagination: Pagination,
    "v-table": VTable,
  },
  async mounted() {
    await this.$store.dispatch("auth/findMe");

    if (!(this.isLogged && this.me && this.me.is_staff)) {
      window.location.href = "/";
    }

    this.page = this.$route.query.page ?? 0;
    this.$store.dispatch("models/getModels", this.page).then(() => {
      this.pages = Math.ceil(this.count / 20);
    });
  },
  methods: {
    getFileName(path) {
      return path.split("/").at(-1);
    },
    saveModel(event) {
      const f = this.form;

      if (f.name && f.duration && f.height && f.weight) {
        this.$store.dispatch("models/editModel", this.form).then((response) => {
          if (response.status == 200) {
            this.$toast.success("Model has been saved");
            this.$store.dispatch("models/getModels", this.page).then(() => {
              this.pages = Math.ceil(this.count / 20);
            });

            this.boxEditModel = 0;
          } else {
            this.$toast.error(response.data.error);
          }
        });
      } else {
        this.$toast.error("Fill all the required fields");
      }
      event.preventDefault();
    },
    openEditModal(id) {
      this.$store.dispatch("models/findModel", id).then((response) => {
        this.boxEditModel = id;
        this.form = response.data;
      });
    },
    openModal(id) {
      this.boxDeleteModel = id;
    },
    deleteModel() {
      if (this.boxDeleteModel) {
        this.$store
          .dispatch("models/deleteModel", this.boxDeleteModel)
          .then((response) => {
            if (response.status == 204) {
              this.$store.dispatch("models/getModels", this.page).then(() => {
                this.pages = Math.ceil(this.count / 20);
              });
              this.$toast.success("Model deleted!");
              this.boxDeleteModel = 0;
            } else {
              this.$toast.error(response.data);
            }
          });
      }
    },
  },
};
</script>
