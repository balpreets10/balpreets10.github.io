//Header Section -->
export const renderheader = () => {
  return `
    <i class="header-toggle d-xl-none bi bi-list"></i>

      <nav id="navmenu" class="navmenu">
        <ul>
          <!-- <li><a href="#home" class="active"><i class="bi bi-house navicon"></i><span>Home</span></a></li> -->
          <li>
            <a href="#about"
              ><i class="bi bi-person navicon"></i><span>About</span></a
            >
          </li>
          <li>
            <a href="#services"
              ><i class="bi bi-hdd-stack navicon"></i><span>Skills</span></a
            >
          </li>
          <li>
            <a href="#portfolio"
              ><i class="bi bi-images navicon"></i><span>Portfolio</span></a
            >
          </li>
          <li>
            <a href="#resume"
              ><i class="bi bi-file-earmark-text navicon"></i
              ><span>Resume</span></a
            >
          </li>
        </ul>
      </nav>
       `;
};