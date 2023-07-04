<script lang="ts">
    import '@carbon/styles/css/styles.css';
import "carbon-components-svelte/css/g100.css";
import '@carbon/charts/styles.css';
	import { firebaseApp,userResult } from "./store";
    import {Button, OverflowMenu} from "carbon-components-svelte";
	import { login } from "./firebase";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores'; 
    const auth = getAuth();
    let user:User|null;
    userResult.subscribe((value) => {
        user=value;
    })


    import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SkipToContent,
    OverflowMenuItem,
    Content,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";
	import { User as UserIcon } from "carbon-icons-svelte";
	import { getAuth, signOut, type User } from "firebase/auth";
	import { Login } from "carbon-icons-svelte";


  let isSideNavOpen = false;

</script>




<Header company="Arduino BCG" platformName="Smart Home" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>

    <HeaderUtilities>
      <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} />
    
    <OverflowMenu icon={UserIcon} flipped size="xl">
        {#if user}
        <OverflowMenuItem
        text={user?.displayName||"No username"}
        hasDivider={true}
      />
        <OverflowMenuItem
        on:click={ () => {signOut(auth).then(() => goto("/")).catch((e) => console.error)}}
        text="Logout"
      />
        {:else}
        <OverflowMenuItem on:click={login} text="Login with Google" />
        {/if}
      </OverflowMenu>
    </HeaderUtilities>
  </Header>
  
  <!-- <SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
      <SideNavLink text="Link 1" />
      <SideNavLink text="Link 2" />
      <SideNavLink text="Link 3" />
      <SideNavMenu text="Menu">
        <SideNavMenuItem href="/" text="Link 1" />
        <SideNavMenuItem href="/" text="Link 2" />
        <SideNavMenuItem href="/" text="Link 3" />
      </SideNavMenu>
    </SideNavItems>
  </SideNav> -->
  <Content>
<slot />
  </Content>