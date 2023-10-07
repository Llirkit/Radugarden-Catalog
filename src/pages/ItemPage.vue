<script setup>
import { useRoute } from 'vue-router'
import { ref,
 onMounted } from 'vue'
import { Notify } from 'quasar'
import usePost from '@/hooks/usePost'

const route = useRoute()
const item = ref()
const picture = ref()
const btest4 = ref()

{
  "ref": "refs/heads/test"    "before": "6e5f21b4faff0e0ed45f1ed3a46ad3d1100c5a73",

    "after":"b1a9a57fe94d20d73144825c86ab333f940d580f",

    "repository":
  {
    "id":683654722,

      "node_id":"R_kgDOKL--Qg",

      "name":"Radugarden-Catalog",
"full_name":"Llirkit/Radugarden-Catalog",
"private":false,
"owner": {
      "name":"Llirkit",
      "email":"loooool812@gmail.com",
      "login":"Llirkit",
      "id":24352164,
      "node_id":"MDQ6VXNlcjI0MzUyMTY0",
      "avatar_url":"https://avatars.githubusercontent.com/u/24352164?v=4",
      "gravatar_id":"",
      "url":"https://api.github.com/users/Llirkit",
      "html_url":"https://github.com/Llirkit",
      "followers_url":"https://api.github.com/users/Llirkit/followers",
      "following_url":"https://api.github.com/users/Llirkit/following{/other_user}",
      "gists_url":"https://api.github.com/users/Llirkit/gists{/gist_id}",
      "starred_url":"https://api.github.com/users/Llirkit/starred{/owner}{/repo}",
      "subscriptions_url":"https://api.github.com/users/Llirkit/subscriptions",
      "organizations_url":"https://api.github.com/users/Llirkit/orgs",
      "repos_url":"https://api.github.com/users/Llirkit/repos",
      "events_url":"https://api.github.com/users/Llirkit/events{/privacy}",
      "received_events_url":"https://api.github.com/users/Llirkit/received_events",
      "type":"User",
      "site_admin":false
      },
"html_url":"https://github.com/Llirkit/Radugarden-Catalog",
"description":null,
"fork":false,
"url":"https://github.com/Llirkit/Radugarden-Catalog",
"forks_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/forks",
"keys_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/keys{/key_id}",
"collaborators_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/collaborators{/collaborator}",
"teams_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/teams",
"hooks_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/hooks",
"issue_events_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/issues/events{/number}",
"events_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/events",
"assignees_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/assignees{/user}",
"branches_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/branches{/branch}",
"tags_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/tags",
"blobs_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/git/blobs{/sha}",
"git_tags_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/git/tags{/sha}",
"git_refs_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/git/refs{/sha}",
"trees_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/git/trees{/sha}",
"statuses_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/statuses/{sha}",
"languages_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/languages",
"stargazers_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/stargazers",
"contributors_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/contributors",
"subscribers_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/subscribers",
"subscription_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/subscription",
"commits_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/commits{/sha}",
"git_commits_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/git/commits{/sha}",
"comments_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/comments{/number}",
"issue_comment_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/issues/comments{/number}",
"contents_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/contents/{+path}",
"compare_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/compare/{base}...{head}",
"merges_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/merges",
"archive_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/{archive_format}{/ref}",
"downloads_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/downloads",
"issues_url":"https://api.github.com/repos/Llirkit/Radugarden-Catalog/issues{/number}",
"pulls





const useNotif = () => {
  Notify.create('Messege')
}

onMounted(async () => {
  item.value = await usePost.getItem(route.params.id)
  picture.value = await usePost.getItemPicture(route.params.id)
})
</script>

<template>
  <div class="page">
    <div class="container">
      <q-btn color="primary" icon="check" label="OK" @click="useNotif" />
      <div class="title">{{ item?.title }}</div>
      <div class="discription">
        <img class="item-image" :src="picture?.url" />
        <div class="body">{{ item?.body }}</div>
      </div>
      <div>
        <q-btn
          color="primary"
          icon="delete"
          label="Удалить"
          @click="usePost.deleteItem(item?.id)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.title {
  width: 100%;
  border: 1px solid;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: 3px;
  padding: 5px;
}

.discription {
  display: flex;
  flex-direction: row;
}

.item-image {
  float: left;
  margin-left: 5px;
  margin-right: 15px;
  width: 150px;
  height: 150px;
}
</style>
