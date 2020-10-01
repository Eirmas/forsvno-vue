<template>
    <div
      class="contact-form__form-element"
    >
        <label>{{ data.inputHeading }}{{ data.required ? "*" : "" }}</label>
        <p>Vedleggene kan ikke overskride 20.00 MB samlet</p>
        <div
          class="attachment__wrapper"
        >
          <label class="attachment__file-input">
            <span>Velg fil</span>
            <input
              :name="data.index"
              :data-text="data.inputHeading"
              :data-required="data.required"
              :multiple="data.options.advanced.multiple"
              :accept="data.options.advanced.accept"
              ref="_input"
              type="file"
              hidden
              @focus="blurOthers"
              @change="showFiles"
            >
          </label>
          <div
            class="attachment__info"
          >
            <div
              v-for="file in fileNames"
              :key="file.name"
            >
              <button
                @click="removeFile(file.name)"
              >
                <img
                  v-if="data.close"
                  :src="data.close"
                  alt="Fjern vedlagt fil(er)"
                >
              </button>
              <span>{{ file.name }} {{file.size}}</span>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import EventBus from "../../../event-bus.es6";

export default {
  name: "Attachment",
  props: {
    data: {
      id: {
        type: [String, Boolean],
        default: false
      },
      index: {
        type: [Number, Boolean],
        default: false
      },
      inputHeading: {
        type: String,
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      close: {
        type: [String, Boolean],
        default: false
      },
      options: {
        advanced: {
          accept: {
            type: [String],
            default: false
          },
          multiple: {
            type: Boolean,
            default: false
          }
        }
      }
    }
  },
  data: () => ({
    fileNames: []
  }),
  methods: {
    blurOthers() {
      EventBus.$emit("blur", this.data.id);
    },
    showFiles(e) {
      const files = e.target.files;
      this.fileNames = [];
      files.forEach((file) => {
        this.fileNames.push({
          name: file.name,
          size: this.formatBytes(file.size, 0)
        });
      });
    },
    removeFile(name) {
      const dt = new DataTransfer();
      const fileInput = this.$refs._input;
      fileInput.files.forEach((file) => {
        if (file.name !== name) {
          dt.items.add(file);
        }
      });
      fileInput.files = dt.files;
      fileInput.dispatchEvent(new Event("change"));
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `(${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]})`;
    }
  }
};
</script>
<style lang="scss">
.attachment__wrapper {
  display: flex;
  .attachment__file-input {
    position: relative;
    margin: 0;
    span {
      display: block;
      cursor: pointer;
      border: 2px solid #191B21;
      padding: .5rem 2rem;
    }
  }
  .attachment__info {
    margin-left: 1rem;
    div {
      display: flex;
      align-items: center;
      button {
        width: 2rem;
        height: 2rem;
        img {
          width: 40%;
          height: 40%;
        }
      }
      span {
        text-decoration: underline;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 330px;
      }
    }
  }
}
</style>
