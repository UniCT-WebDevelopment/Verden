<template lang="pug">
  .mx-auto.w-90p.py-6#modelpage(class="sm:px-6 lg:px-8 md:max-w-7xl")
    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="modalLoginError")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-10.overflow-y-auto
        .flex.min-h-full.items-end.justify-center.p-4.text-center(class="sm:items-center sm:p-0")
          .relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl.transition-all(class="sm:my-8 sm:w-full sm:max-w-lg")
            .bg-white.px-4.pt-5.pb-4(class="sm:p-6 sm:pb-4")
              div
                h2 You must <nuxt-link class="underline" :to="'/signin?ref=/models/'+model.id">log in</nuxt-link> first.
            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6")
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="modalLoginError = false"
              ) Cancel

    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxReport")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-10.overflow-y-auto
        .flex.min-h-full.items-end.justify-center.p-4.text-center(class="sm:items-center sm:p-0")
          .relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl.transition-all(class="sm:my-8 sm:w-full sm:max-w-lg")
            .bg-white.px-4.pt-5.pb-4(class="sm:p-6 sm:pb-4")
              div
                label.block.text-sm.font-medium.text-gray-700(for="warning_note") Note 
                .mt-1
                  textarea#description.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="warning_note" rows="3"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    placeholder="'This model is so ugly!' That's an example of a bad report."
                    v-model="report.warning_note"
                    required
                  )
            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6")
              button.inline-flex.w-full.justify-center.rounded-md.border.border-transparent.bg-green-600.px-4.py-2.text-base.font-medium.text-white.shadow-sm(
                type="button"
                :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm': true, 'opacity-25 cursor-default': isLoading}"
                :disabled="isLoading" :readonly="isLoading" v-if="isLogged"
                @click="sendReport"
              )
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                | Send report
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="boxReport = false"
              ) Cancel

    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxDeleteModel")
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
                @click="boxDeleteModel = !boxDeleteModel"
              ) Cancel

    section.mb-5
      .flow-root
        .float-left
          h1.text-3xl.font-bold.border-green-500.border-b-2.pb-3.w-full.mb-2(class="md:w-max md:mb-0 dark:text-white") {{ model.name }}
        .float-right(v-if="model.author")
          .flex
            .mr-3.float-left
              user-avatar(:data="model.author")
            p.leading-8
              nuxt-link.text-green-800(class="hover:text-green-700 dark:text-green-300 dark:hover:text-green-200" :to="'/user/'+model.author_id")
                | @
                span.underline {{ model.author.username }}
      .description.mt-3(class="dark:text-white")
        p {{ model.description }}

    .mb-5.text-right
      button.inline-flex.leading-6.justify-center.rounded-md.border.border-transparent.bg-white.py-2.px-4.mr-2.text-sm.font-medium.text-black.shadow-sm(
        class="hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
        @click="toggleLike"
        :disabled="isLoading"
        :readonly="isLoading"
      )
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        svg(v-if="!likedByUser()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1")
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        svg(v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1")
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        | {{ model.likes ? model.likes.length : 0 }}
      button.inline-flex.leading-6.justify-center.rounded-md.border.border-transparent.bg-yellow-600.py-2.px-4.mr-2.text-sm.font-medium.text-white.shadow-sm(
        class="hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        @click="openBoxReport()"
      )
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
        </svg>
        | Report
      nuxt-link.inline-flex.leading-6.justify-center.rounded-md.border.border-transparent.bg-gray-600.py-2.px-4.mr-2.text-sm.font-medium.text-white.shadow-sm(
        class="hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        :to="'/models/'+model.id+'/edit'" v-if="me && (me.is_staff || me.id == model.author_id)"
      )
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        | Edit
      button.inline-flex.leading-6.justify-center.rounded-md.border.border-transparent.bg-red-600.py-2.px-4.text-sm.font-medium.text-white.shadow-sm(
        class="hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        @click="boxDeleteModel = !boxDeleteModel" v-if="me && (me.is_staff || me.id == model.author_id)"
      )
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        | Delete
    model-reports-list(:model="model.id" v-if="me && model.id")
    .images.shadow-sm.rounded-lg.bg-white.p-4.w-full(class="dark:bg-gray-800" v-if="model.uploads")
      .block.gap-4.h-full(class="md:flex")
        .w-full(class="md:w-4/5")
          .image.bg-gray-900.border-2.rounded-xl.w-full.h-64.overflow-hidden(class="sm:h-full" v-if="model.uploads && model.uploads[selectedUpload]")
            file-preview(:path="model.uploads[selectedUpload].filepath" bg="#111827" controls="1")
        .w-full.mt-8.h-auto(class="md:w-1/5 md:mt-0" v-if="model")
          .grid.grid-cols-3.gap-4.h-full.overflow-y-auto.grid-mini(class="md:grid-cols-2")
            .border-2.border-gray-300.bg-gray-300.w-20.h-20.rounded-xl.grid.items-center.justify-items-center.overflow-hidden.cursor-pointer(
              v-for="upload, i in model.uploads"
              :key="upload.id"
              :class="{'md:w-24 md:h-24 dark:border-green-100': true, 'border-green-700': selectedUpload == i}"
              @click="selectedUpload = i"
            )
              file-preview(:path="upload.filepath")

    section.mt-5
      .grid.grid-cols-2.gap-5.mb-5(class="md:grid-cols-6")
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full(class="dark:bg-gray-800 dark:text-white")
          h3.font-bold Created: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          p(:title="model.created|moment('DD/MM/YYYY HH:mm')") {{ model.created|moment("DD/MM/YYYY") }}
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full(class="dark:bg-gray-800 dark:text-white")
          h3.font-bold Duration: 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
          </svg>
          p {{ model.duration }}m
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full(class="dark:bg-gray-800 dark:text-white")
          h3.font-bold Height: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
          p {{ model.height }}mm
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full(class="dark:bg-gray-800 dark:text-white")
          h3.font-bold Weight: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
          </svg>
          p {{ model.weight }}g
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full(class="dark:bg-gray-800 dark:text-white" v-if="model.printer")
          h3.font-bold Printer: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
          </svg>
          p {{ model.printer }}
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full(class="dark:bg-gray-800 dark:text-white" v-if="model.material")
          h3.font-bold Material: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
          p {{ model.material }}

    button.card.shadow-sm.rounded-lg.bg-green-700.text-white.p-4.w-full.duration-200(
      :class="{'hover:shadow-lg hover:bg-green-800': true, 'rounded-b-none': boxFilesToDownload}"
      v-if="model.uploads"
      @click="boxFilesToDownload = !boxFilesToDownload"
    )
      span(v-if="!boxFilesToDownload") Show files ({{ model.uploads.length }})
      span(v-else) Close files box ({{ model.uploads.length }})
    .bg-green-50(v-if="boxFilesToDownload")
      ul.divide-y.divide-gray-200.rounded-b-md.border.border-gray-200(role="list")
        li.flex.items-center.justify-between.py-3.pl-3.pr-4.text-sm(v-for="upload in model.uploads" :key="upload.id")
          .flex.w-0.flex-1.items-center
            svg.h-5.w-5.flex-shrink-0.text-gray-400(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
              path(fill-rule="evenodd", d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z", clip-rule="evenodd")
            span.ml-2.w-0.flex-1.truncate {{ getFileName(upload.filepath) }}
          .ml-4.flex-shrink-0
            nuxt-link.font-medium.text-black-700(:to="baseAPI + '' + upload.filepath" target="_new" download class="hover:underline") Download


</template>

<script>
import FilePreview from "@/components/FilePreview.vue";
import ModelReportsList from "@/components/ModelReportsList.vue";
import UserAvatar from "@/components/UserAvatar.vue";

import { mapGetters } from "vuex";

export default {
  name: "ModelView",
  layout: "default",
  data() {
    return {
      id: 0,
      model: {},
      selectedUpload: -1,
      baseAPI: "",
      boxFilesToDownload: false,
      boxDeleteModel: false,
      boxReport: false,
      modalLoginError: false,
      report: {},
    };
  },
  head() {
    return {
      title: this.model.name + " · Verden",
    };
  },
  components: {
    "user-avatar": UserAvatar,
    "file-preview": FilePreview,
    "model-reports-list": ModelReportsList,
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["me", "isLogged"]),
  },
  created() {
    this.id = this.$route.params.id;
    this.baseAPI = this.$config.api;

    this.$store.dispatch("models/findModel", this.id).then((response) => {
      if (response.status != 200) {
        window.location.href = "/models";
      } else {
        this.model = response.data;
        if (this.model.uploads) {
          this.selectedUpload = 0;
        }
      }
    });
  },
  methods: {
    openBoxReport() {
      if (this.isLogged) this.boxReport = true;
      else this.modalLoginError = true;
    },
    getFileName(path) {
      return path.split("/").at(-1);
    },
    deleteModel() {
      if (this.model.id) {
        this.$store
          .dispatch("models/deleteModel", this.model.id)
          .then((response) => {
            if (response.status == 204) {
              this.$toast.success("Model deleted!");
              setTimeout(() => {
                window.location.href = "/models";
              }, 1000);
            } else {
              this.$toast.error(response.data);
            }
          });
      }
    },
    sendReport() {
      if (!this.report.warning_note) {
        this.$toast.warning(
          "We want to prevent spam so, can you add more details about this report?"
        );
        return;
      }

      this.$store
        .dispatch("warnings/createWarning", {
          model_id: this.model.id,
          note: this.report.warning_note,
        })
        .then((response) => {
          if (response.status == 201) {
            this.$toast.success("Report created, thank you!");
            this.report.warning_note = null;
            this.boxReport = false;
            this.$store.dispatch("warnings/filterWarnings", {
              model_id: this.model.id,
            });
          } else {
            this.$toast.error(response.data);
          }
        });
    },
    likedByUser() {
      if (!this.model.likes || !this.me) {
        return false;
      }

      return this.model.likes.filter((x) => x.user_id == this.me.id).length > 0;
    },
    toggleLike() {
      if (!this.isLogged) {
        this.modalLoginError = true;
        return;
      }
      if (this.likedByUser()) {
        this.$store
          .dispatch("models/removeLike", this.model.id)
          .then((response) => {
            if (response.status == 204) {
              this.$toast.success("Like removed!");
              this.$store
                .dispatch("models/findModel", this.id)
                .then((response) => {
                  if (response.status != 200) {
                    window.location.href = "/models";
                  } else {
                    this.model = response.data;
                  }
                });
            } else {
              this.$toast.error(response.data.error);
            }
          });
      } else {
        this.$store
          .dispatch("models/addLike", this.model.id)
          .then((response) => {
            if (response.status == 201) {
              this.$toast.success("Like added!");
              this.$store
                .dispatch("models/findModel", this.id)
                .then((response) => {
                  if (response.status != 200) {
                    window.location.href = "/models";
                  } else {
                    this.model = response.data;
                  }
                });
            } else {
              this.$toast.error(response.data.error);
            }
          });
      }
    },
  },
};
</script>
