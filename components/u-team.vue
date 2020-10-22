<template>
  <!-- Meet the team -->

  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8">
      <div class="space-y-8 sm:space-y-12">
        <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl">
            The People
          </h2>
          <p class="text-xl leading-7 text-gray-500">
            Meet the team of people who help make Ute Valley Park great.
          </p>
        </div>
        <ul class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
          <li v-for="teamMember in teamMembers" :key="teamMember.name">
            <div class="space-y-4">
              <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" :src="teamMember.image" :alt="'Photo of ' + teamMember.name">
              <div class="space-y-2">
                <div class="text-xs leading-4 font-medium lg:text-sm lg:leading-5">
                  <h4>{{ teamMember.name }}</h4>
                  <p class="text-green-600">
                    {{ teamMember.title }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      teamMembers: [
        { name: 'Dan Woods', title: 'President', image: 'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Kris Kaltenbacher', title: 'Secretary', image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Dave Ward', title: 'Treasurer', image: 'https://images.unsplash.com/photo-1505632958218-4f23394784a6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Larry DeWitt', title: 'Coordinator of Volunteers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Nick Cirincione', title: 'Coordinator of Volunteers', image: 'https://images.unsplash.com/photo-1568990545613-aa37e9353eb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Christine Thomas', title: 'Coordinator of Volunteers', image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Liz Campbell', title: 'Coordinator of Volunteers', image: 'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Frank Self', title: 'Property and Master Plan', image: 'https://images.unsplash.com/photo-1584940120743-8981ca35b012?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Phil Emmert', title: 'Publicity', image: 'https://images.unsplash.com/flagged/photo-1567194974473-c866a1ba88d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Bruce Hutchinson', title: 'Education', image: 'https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' },
        { name: 'Carl Reese', title: 'Communications, Website, Newsletter', image: 'https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80' }
      ]
    }
  }
}
</script>
