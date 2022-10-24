<template lang="pug">
  form.mt-3
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
    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxDeleteModelUpload > 0")
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
                      | This file will be deleted from '{{ form.name }}' and our servers. This action cannot be undone.
            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6")
              button.inline-flex.w-full.justify-center.rounded-md.border.border-transparent.bg-red-600.px-4.py-2.text-base.font-medium.text-white.shadow-sm(
                type="button"
                :class="{'hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm': true, 'opacity-25 cursor-default': isLoading}"
                :disabled="isLoading"
                :readonly="isLoading"
                @click="deleteFile"
              )
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                | Yes, confirm
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="boxDeleteModelUpload = 0"
              ) Cancel
    .shadow(class="sm:overflow-hidden sm:rounded-md")
      .grid.grid-cols-2(v-if="form.id" class="dark:bg-gray-800")
        button.p-2.duration-100(
          type="button"
          :class="{'dark:hover:bg-gray-300 hover:bg-white dark:text-white': true, 'bg-white dark:bg-green-500 border-green-600 border-b-2': tab == 'info'}"
          @click="tab = 'info'"
        ) Info
        button.p-2.duration-100(
          type="button"
          :class="{'dark:hover:bg-gray-300 hover:bg-white dark:text-white': true, 'bg-white dark:bg-green-500 border-green-600 border-b-2': tab == 'files'}"
          @click="tab = 'files'"
        ) Files
      div(v-if="tab == 'info'")
        .space-y-6.bg-white.px-4.py-5(class="sm:p-6 dark:bg-gray-800")
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="name") Name
            .mt-1
              input#name.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="name"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                placeholder="My super project"
                required
                v-model="form.name"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="description") Description 
              span.text-gray-300 (Optional)
            .mt-1
              textarea#description.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="description" rows="3"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                placeholder="Now this is the story all about how, My life got flipped-turned upside down... "
                v-model="form.description"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="duration") Duration
            .mt-1
              input#duration.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="duration"
                type="number"
                step="0.01"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                required
                v-model="form.duration"
              )
            p.text-sm.text-gray-500 Print duration in minutes
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="height") Height
            .mt-1
              input#height.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="height"
                type="number"
                step="0.01"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                required
                v-model="form.height"
              )
            p.text-sm.text-gray-500 Height in mm
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="weight") Weight
            .mt-1
              input#weight.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="weight"
                type="number"
                step="0.01"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                required
                v-model="form.weight"
              )
            p.text-sm.text-gray-500 Weight in g
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="printer") Printer 
              span.text-gray-300 (Optional)
            .mt-1
              input#printer.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="printer"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                placeholder="Formlabs Form 3BL"
                v-model="form.printer"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="material") Material 
              span.text-gray-300 (Optional)
            .mt-1
              input#material.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="material"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                placeholder="PLA"
                v-model="form.material"
              )
        .py-3.px-4.text-right(class="sm:px-6")
          button.inline-flex.justify-center.rounded-md.border.border-transparent.bg-green-600.py-2.px-4.text-sm.font-medium.text-white.shadow-sm(
            type="submit"
            :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2': true, 'opacity-25 cursor-default': isLoading}"
            :disabled="isLoading"
            :readonly="isLoading"
            @click="save"
          )
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            | Save
          p.text-sm.text-gray-700.mt-2(v-if="!form.id" class="dark:text-white") You will add assets like images and STL/OBJ later.
      div(v-else)
        .space-y-6.bg-white.px-4.py-5(class="sm:p-6 dark:bg-gray-800 dark:text-white")
          h3(v-if="form.uploads") Manage '{{ form.name }}' already uploaded files
          ul.divide-y.divide-gray-200.rounded-md.border.border-gray-200(class="dark:border-gray-500 dark:divide-gray-500" role="list" v-if="form.uploads")
            li.flex.items-center.justify-between.py-3.pl-3.pr-4.text-sm(v-for="upload in form.uploads" :key="upload.id")
              .flex.w-0.flex-1.items-center
                svg.h-5.w-5.flex-shrink-0.text-gray-400(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
                  path(fill-rule="evenodd", d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z", clip-rule="evenodd")
                span.ml-2.w-0.flex-1.truncate {{ getFileName(upload.filepath) }}
              .ml-4
                a.font-medium.text-black-700.cursor-pointer.mr-2(class="hover:underline" @click="openPreview = upload.filepath") Preview
                a.font-medium.text-red-700.cursor-pointer(class="hover:underline dark:text-red-500" @click="boxDeleteModelUpload = upload.id") Delete
          hr(v-if="form.uploads")
          h3 Add new uploads
          label.inline-flex.leading-6.justify-center.rounded-md.border.border-transparent.bg-green-600.py-2.px-4.text-sm.font-medium.text-white.shadow-sm.cursor-pointer(
            class="hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            for="upload"
          )
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            | Select file(s)
          input.hidden(
            id="upload"
            type="file"
            multiple
            @change="manageUploads"
          )
          ul
            li.flex.items-center.justify-between.py-3.pl-3.pr-4.text-sm(v-for="file in filesToUpload" :key="file.lastModified+''+file.name")
              .flex.w-0.flex-1.items-center
                svg.h-5.w-5.flex-shrink-0.text-gray-400(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
                  path(fill-rule="evenodd", d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z", clip-rule="evenodd")
                span.ml-2.w-0.flex-1.flex.truncate(v-if="checkExt(file.name)") {{ file.name }}
                  svg(
                    class="ml-2 w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    v-if="file.uploaded == 0"
                  )
                    circle(class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4")
                    path(class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")
                  svg(
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#10b981" class="ml-2 w-6 h-6"
                    v-else-if="file.uploaded == 1"
                  )
                    path(stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z")
                  svg(
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#dc2626" class="ml-2 w-6 h-6"
                    v-else
                  )
                    path(stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z")


                span.ml-2.w-0.flex-1.truncate.text-gray-500(v-else) 
                  s.text-red-500.mr-2 {{ file.name }}
                  | (this file type is not supported, so it'll not be uploaded)
</template>

<script>
import FilePreview from "@/components/FilePreview.vue";

import { mapGetters } from "vuex";

export default {
  name: "ModelForm",
  props: ["data"],
  data() {
    return {
      form: {},
      tab: "info",
      boxDeleteModelUpload: 0,
      openPreview: null,
      filesToUpload: [],
    };
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  components: {
    "file-preview": FilePreview,
  },
  created() {
    if (this.data) this.form = { ...this.data };
  },
  methods: {
    save(event) {
      const f = this.form;

      if (f.name && f.duration && f.height && f.weight) {
        const action = this.form.id ? "models/editModel" : "models/createModel";
        this.$store.dispatch(action, this.form).then((response) => {
          if (response.status == 201 || response.status == 200) {
            this.$toast.success("Model has been saved");
            setTimeout(() => {
              window.location.href = "/models/" + response.data.id + "/edit";
            }, 1000);
          } else {
            this.$toast.error(response.data.error);
          }
        });
      } else {
        this.$toast.error("Fill all the required fields");
      }
      event.preventDefault();
    },
    getFileName(path) {
      return path.split("/").at(-1);
    },
    deleteFile() {
      this.$store
        .dispatch("models/deleteUpload", {
          id: this.form.id,
          uid: this.boxDeleteModelUpload,
        })
        .then((response) => {
          if (response.status == 204) {
            this.$toast.success("File deleted successfully");
            for (const i in this.form.uploads) {
              if (this.form.uploads[i].id == this.boxDeleteModelUpload) {
                this.form.uploads.splice(i, 1);
                break;
              }
            }
            this.boxDeleteModelUpload = 0;
          } else {
            this.$toast.error("Error: " + response.data.error);
          }
        });
    },
    manageUploads(event) {
      for (const file of event.target.files) {
        if (this.checkExt(file.name)) {
          file.uploaded = 0;
          this.$store
            .dispatch("models/upload", { id: this.form.id, file })
            .then((response) => {
              if (response == 200) {
                this.$toast.success(`'${file.name}' has been uploaded`);
                this.$store
                  .dispatch("models/findModel", this.form.id)
                  .then((response) => {
                    this.form.uploads = response.data.uploads;
                  });
                file.uploaded = 1;
              } else {
                this.$toast.error(`Error uploading '${file.name}'`);
                file.uploaded = -1;
              }
            });
        }
        this.filesToUpload.push(file);
      }
    },
    checkExt(name) {
      const exts = [
        ".stl",
        ".obj",
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".webp",
        ".blend",
      ];
      for (const ext of exts) {
        if (name.toLowerCase().indexOf(ext) > 0) return true;
      }

      return false;
    },
  },
};
</script>
