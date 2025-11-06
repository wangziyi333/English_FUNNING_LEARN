<template>
  <div class="ps_body">
    <div class="upper">
      <div class="avater">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="头像" />
        <div class="avater-hover">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFC0lEQVR4Xu2ba8ilUxTHf39J5H6NQiQSii80bjENNeEDmtw1Jb64jhqF1AwJZcow+EJqmnJLzIeZmkJoxMQXComkjCL3cckk+WvpOdM++33OOc9znufMeY9zVp0v77P22mv991prr7X3fsWUk6bcfmYAzDxgyhGYhcCUO8DOTYK2d6kCuKR/qvC1wTPSELB9CHAVcA5wGLBrRaX/Br4B3gKelfRdxXG12UYGgO3TgQeAvWtr1T3gN+BuSe82lFM6fCQA2D4eeBrYvSWltwPXS/q0JXk7xLQOgO3dwm2Bo1pW9kvgakl/tSl3FAAsA67JlHwKeB4Id65CETZXADdkzOskPVpFQFWeVgGwfXLh+qncjZJWVFUo5bN9H3BB8jcXofDhMPLKxrQGgO2I9+eAI5KJvgcuk1R15bt0tB2e8CJwcPJhK3ClpMgLjakyAIWBC4ATC4X2zGaPLS++pXSrpHeaaGn7TCB3+4+BfGv8AwjA49uWqgANBMD2PsB1wJKaWX29pPubGN8Za/se4OIassI7XgKekfRrv3F9AShi+mHggBqTB+u3wOWSYlUak+3wtheAQ2sK+wm4Q1LPnNETANvh7qtrVG8d3QL9myV9UFPZvuy2TwEer+mFITOqymWStlROgrYjka0D9soG/Qi8CnwBlK1uTPbRqErXorQ+qceihJccA5wPHJjp/TtwraRIoF1U6gG2HwHOzng3AKskhbB5S7Zj0ZYDF2VKbpZ0+0AAbEcmX5sxRjJ5ct5aXaKY7RuL5J1+XSopdokdNMcDbN8W7pLwfF64T7j3xJDt6DwjjI9NlJ5TSZYBEHX8ccmguyRF3E8c2Y588GCi+GeSoj3v6wGvA/smPIsl/dCG9cWqnAvE74SkwosC5hPgzfhJasXbbB8EbEp03yZpUU8AbIdHvJ8Zu6ANhWwvBCK8Dh8A5tdR+Ul6oynoBeD59neqpOgp/qOuECiOrN7LJj6tyRFVIfOWLK9UsS3id00Lc/e1Z2cAkCfVKsZ3eBq1v1UWdKQAFG4fpXROUVOsB+KQI+jootbP9+74FqXsUOEwVgCK+IuGJI35n4EVvTpE22cA9wL7J4hFTlgyTB4aNwDnAQ9lSz+wPS5AeCwbd6ek1+rETvCOG4BohRcnSm+QtLKKEbaDLw2HTZKiJa5F4wbgZeDIROM41a3UIRadX5wqd+grSZfWsn4eeMBmYI9E6UWStlUxwnYUYlGQdehPSXlzNlDUuD1g6gGY+hCY+iQ49dtg9OPTWwgVhUh0gNNZCnf2qJITpoHbV8Iw2c1QUo5ObzuceMI4DkTiSc54zwNSfx/Dkdj8AqBO8LfBO9ZSuA0DmsqoDUCRtN7O7t8WDnu/39SApuOL9wXpadJ2SWelcsvuBV7JHjlUbmObKtz2+JK2equkSwYBkNfwQz9xaduguvJsx/Hahcm4OQcrZR5QVsPH9XKExsSQ7XD1uN5Pac7RWhkAZTX8L8DKSQGhMD6O1fZLrC89XO11PR5XV6tKlnsjEDmi1/uAcXpI531AxHjq9h2dlkuKq7cu6vdCJMrXpeO0qMW510paUyavHwBRRd30PwAh3jo80euKrcorsQiHeP056FKzxQVrRVTE/Ooyt++7DZZNndXwnXeCbT2EbsVaIB5ndd4JVr5mH+gBvbSr+s8PbVk3SM6wt8hDAzBIoUn5PgNgUlZqVHrOPGBUyE6K3JkHTMpKjUrPfwGerYtf3LH0qAAAAABJRU5ErkJggg=="
            alt="相机"
          />
        </div>
      </div>
      <div class="name">
        <span>{{ name }}</span>
      </div>
    </div>
    <div class="basic"></div>
    <div class="change"></div>
  </div>
</template>
<script lang="ts" name="Console" setup>
import { useNameStore } from '@/store/nameStore'
import { ref } from 'vue'
const name = ref('未闻')
const { sys_settings, Breadcrumbs, prs_settings } = useNameStore()
Breadcrumbs[0] = sys_settings
Breadcrumbs[1] = prs_settings
</script>
<style scoped>
.ps_body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: #fff;
}
.upper {
  margin: 50px 100px;
  display: flex;
  align-items: center;
}
.avater {
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
}
.avater:hover .avater-hover {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avater img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.avater-hover {
  display: none;
  position: absolute;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(1, 1, 1, 0.2);
}
.avater-hover img {
  height: 50%;
  width: 50%;
}
.upper .name {
  width: 100%;
  height: 100%;
}
.upper .name span {
  font-size: 30px;
}
</style>
