<template>
  <div id="app">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10" sm="12" md="4" lg="4" xl="4" xxl="4">
        <v-text-field dark placeholder="Article title" v-model="articleTitle"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="2" lg="2" xl="2" xxl="24">
        <v-file-input v-model="articlePhoto" color="blue darken-1" counter dark ref="blogPhoto"
          label="Article Photo(720p)" prepend-icon="mdi-camera" outlined rounded :show-size="1000">
          <template v-slot:selection="{ index, text }">
            <v-chip v-if="index < 2" color="blue darken-1" dark small>
              {{ text }}
            </v-chip>

            <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
      </v-col>
      <v-col cols="12" sm="12" md="2" lg="2" xl="2" xxl="24">
        <v-autocomplete v-model="articleCategory" :items="categories" outlined dense rounded dark chips small-chips
          label="Category" class="pt-2"></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="pb-15">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-text-field label="Short description" dark v-model="shortDescription" hide-details="auto"></v-text-field>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <div>
          <v-btn class="tipTapButton" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
            H1
          </v-btn>
          <v-btn class="tipTapButton" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            H2
          </v-btn>
          <v-btn class="tipTapButton" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            H3
          </v-btn>
          <v-btn class="tipTapButton" @click="editor.chain().focus().setBold().run()">
            set Bold
          </v-btn>
          <v-btn class="tipTapButton" @click="editor.chain().focus().unsetBold().run()">
            unset Bold
          </v-btn>
          <v-btn class="tipTapButton" @click="addImage">add image from URL</v-btn>
          <v-btn class="tipTapButton" id="add" @click="addVideo">
            Add YouTube video
          </v-btn>
        </div>
        <div class="editor">
          <editor-content :editor="editor" class="editorBox" :comment_text="comment_text" v-model="comment_text"
            height="500px" />
        </div>
        <v-row class="text-center">
          <v-col cols="12">
            <v-text-field dark label="Tags" v-model="tagInput" hide-details="auto" @keyup.enter="addTag()"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-chip close v-for="(tag, index) in tags" :key="index" class="ml-2" @click:close="remove(index)">
              {{ tag }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="12">
            <v-btn color="blue" class="mb-5" dark @click="publishArticle()">PUBLISH</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Editor, EditorContent } from '@tiptap/vue-2'
import Youtube from '@tiptap/extension-youtube'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import { db } from "@/main"
import { doc, setDoc } from "firebase/firestore"
import { storage } from '@/main'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import router from '@/router'
export default {
  name: 'app',
  components: {
    EditorContent,
  },
  data() {
    return {
      articlePhoto: null,
      articleContent: '',
      tagInput: '',
      categories: ['Sandbox', 'Real-time strategy', 'Shooters',
        'Role-playing', 'Simulation and sports', 'Puzzlers and party games', 'Action-adventure', 'Survival and horror', 'Platformer', 'Multiplayer online battle arena', 'Movies'],
      articleTitle: '',
      articleCategory: '',
      shortDescription: '',
      editor: null,
      comment_text: [],
      tags: [],
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        Document,
        Bold,
        Paragraph.configure({
          HTMLAttributes: {
            class: 'my-custom-paragraph',
          },
        }),
        Youtube.configure({
          controls: false,
          HTMLAttributes: {
            class: 'iframe',
          },
        }),
        Heading.configure({
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'my-custom-heading',
          },
        }),
        Text,
        Image.configure({
          HTMLAttributes: {
            class: 'my-custom-image',
          },
        }),
        Dropcursor,
      ],
      content: '',
    })
  },
  methods: {
    addTag() {
      this.tags.push(this.tagInput.toLowerCase());
      this.tagInput = '';
    },
    remove(index){
      this.tags.splice(index, 1);
    },
    async publishArticle() {
      var currentDateTime = new Date();
      var idTitle = this.articleTitle;
      //var idarticle = this.articleCategory;
      this.comment_text = this.editor.getHTML();
      const storageRef = ref(storage, idTitle);
      await uploadBytes(storageRef, this.articlePhoto).then(() => {
        console.log('Uploaded a file!');
      });
      await getDownloadURL(ref(storage, idTitle))
        .then((url) => {
          setDoc(doc(db, "articles", idTitle), {
            articleCoverPhoto: url,
            title: this.articleTitle,
            articleDate: currentDateTime,
            articleCategory: this.articleCategory,
            shortDescription: this.shortDescription,
            articleText: this.comment_text,
            id: idTitle,
            tags: this.tags
          });
        });
      router.push('/')
    },
    addVideo() {
      const url = prompt('Enter YouTube URL')

      this.editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(this.width, 10)) || 640,
        height: Math.max(180, parseInt(this.height, 10)) || 480,
      })
    },
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  computed: {
    html() {
      if (!this.editor) return "";
      return this.editor.getHTML();
    }
  },

}


</script>
<style scoped>
.editorBox {
  background-color: rgb(255, 255, 255) !important;
  border-radius: 10px;
}

.editor {
  padding-top: 20px;
}

.tipTapButton {
  margin-right: 4px;
  margin-top: 4px;
  color: black;
  font-weight: 900;
}
</style>