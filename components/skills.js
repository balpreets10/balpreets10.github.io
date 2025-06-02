export const renderSkills = () => {
    return `
    <section id="services" class="services section" data-aos="fade-up">

      <!-- Section Title -->
      <div class="container section-title">
        <h2>SKILLS AND SOFTWARES</h2>
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon"><i class="fa-solid fa-toolbox"></i></div>
          <div class="divider-custom-line"></div>
        </div>
        <p>List of known languages, IDE's along with softwares worked upon, including tools and 3rd party plugin
          integrations</p>
        </br></br>
      </div><!-- End Section Title -->

      <div class="container justify-content-center ">
        <div class="row justify-content-center">
          <div class="col-6 col-lg-4 ">
            <h4>IDE</h4>
            <ul>
              <li><i class="fa-brands fa-unity"></i> <strong>Unity</strong> </li>
              <li><i class="fa-brands fa-android"></i> <strong>Android Studio</strong></li>
              <li><img src="assets/ico/vs.ico" 
                alt="" style="width: 16px; height: 16px;" />Visual Studio</strong></li>
              <li><img src="assets/ico/rider.ico" 
                alt="" style="width: 16px; height: 16px;" /> <strong>Rider</strong></li>
                <li><i class="fa-brands fa-js"></i><strong>Phaser.JS</strong></li>
              <li><img src="assets/ico/vs-code.ico" 
                alt="" style="width: 16px; height: 16px;" /><strong>VS Code</strong></li>
            </ul>
          </div>
          <div class="col-6 col-lg-4 ">
            <h4>Softwares</h4>
            <ul>
              <li><i class="fa-brands fa-discord"></i> <strong>Discord</strong> </li>
              <li><i class="fa-brands fa-sourcetree"></i> <strong>Sourcetree</strong></li>
              <li><i class="fa-brands fa-slack"></i> <strong>Slack</strong></li>
              <li><i class="fa-brands fa-github"></i> <strong>Github Desktop</strong></li>
              <li><img src="assets/ico/filezilla.ico" 
                alt="" style="width: 16px; height: 16px;" /> <strong>FileZilla</strong></li>
            </ul>
          </div>

          <div class="col-6 col-lg-4 ">

            <h4>Tools</h4>
            <ul>
              <li><img src="assets/ico/cicd.ico" 
                alt="" style="width: 16px; height: 16px;" />  <strong>CI/CD Pipelines</strong></li>
              <li><i class="fa-brands fa-jira"></i> <strong>JIRA</strong> </li>
              <li><i class="fa-brands fa-gitlab"></i> <strong>Gitlab</strong></li>
              <li><i class="fa-brands fa-trello"></i> <strong>Trello</strong></li>
              <li><img src="assets/ico/asana.ico" 
                alt="" style="width: 16px; height: 16px;" /> <strong>Asana</strong></li>
            </ul>

          </div>
          <!-- </div> -->
          <!-- <div class="row justify-content-center"> -->
          <div class="col-6 col-lg-4 ">
            <h4>Languages</h4>
            <ul>
              <li><i class="bi"></i> <strong>C</strong> </li>
              <li><i class="bi"></i> <strong>C++</strong></li>
              <li><i class="bi"></i> <strong>Java</strong></li>
              <li><i class="bi"></i> <strong>C#</strong></li>
              <li><i class="bi"></i> <strong>VB.NET</strong></li>
              <li><i class="bi"></i> <strong>NoSQL</strong></li>
            </ul>
          </div>


          <div class="col-6 col-lg-4 ">
            <h4>Plugins</h4>
            <ul>
              <li><img src="assets/ico/firebase.ico" 
                alt="" style="width: 16px; height: 16px;" /> <strong>Firebase</strong> </li>
              <li><img src="assets/ico/photon.ico" 
                alt="" style="width: 16px; height: 16px;" /> <strong>Photon</strong></li>
              <li><img src="assets/ico/playfab.ico" 
                alt="" style="width: 16px; height: 16px;" /> <strong>Playfab</strong></li>
              <li><i class="fa-brands fa-square-facebook"></i> <strong>Facebook SDK</strong></li>
              <li><i class="fa-brands fa-google-play"></i> <strong>Google Play Games SDK</strong></li>
              <li><i class="fa-brands fa-google-play"></i> <strong>Mirror</strong></li>
            </ul>
          </div>

          <div class="col-6 col-lg-4 ">
            <h4>Deployment</h4>
            <ul>
              <li><i class="fa-brands fa-google-play"></i> <strong>Google Play Store</strong> </li>
              <li><i class="fa-brands fa-apple"></i> <strong>Apple App Store</strong></li>
              <li><i class="fa-solid fa-server"></i> <strong>Web Servers</strong></li>
              <li><i class="fa-brands fa-windows"></i> <strong>Standalone Installers</strong></li>
              <li><i class="fa-brands fa-windows"></i> <strong>Standalone Uninstallers</strong></li>
            </ul>
          </div>

        </div>

        <div class="row justify-content-center">
          <div class="col-8 col-lg-4">
            <h4>Development Aspects</h4>
            <ul>
              <li> <strong>Engine Design</strong> </li>
              <li><i class="bi"></i> <strong>Scriptable Objects</strong> </li>
              <li><i class="bi"></i> <strong>Custom Inspectors</strong> </li>
              <li><i class="bi"></i> <strong>User Interface</strong></li>
              <li><i class="bi"></i> <strong>Editor Scripting</strong></li>
              <li><i class="bi"></i> <strong>Addressables</strong> </li>
              <li><i class="bi"></i> <strong>Asset Bundles</strong> </li>
              <li><i class="bi"></i> <strong>Multiplayer</strong></li>
              <li><i class="bi"></i> <strong>DSA</strong></li>
              <li><i class="bi"></i> <strong>JSON</strong></li>
            </ul>
          </div>

          <div class="col-8 col-lg-4">
            <h4>Techniques / Patterns</h4>
            <ul>
              <li><i class="bi"></i> <strong>O.O.P.S</strong> </li>
              <li><i class="bi"></i> <strong>S.O.L.I.D</strong> </li>
              <li><i class="bi"></i> <strong>MVC</strong> </li>
              <li><i class="bi"></i> <strong>MVVM</strong> </li>
              <li><i class="bi"></i> <strong>Observer</strong> </li>
              <li><i class="bi"></i> <strong>Template</strong> </li>
              <li><i class="bi"></i> <strong>Dependency Injection</strong> </li>
              <li><i class="bi"></i> <strong>Asynchronous Programming</strong> </li>
              <li><i class="bi"></i> <strong>Abstraction</strong></li>
              <li><i class="bi"></i> <strong>Extension</strong></li>
              <li><i class="bi"></i> <strong>REST Ful API's</strong> </li>
              
            </ul>
          </div>

        </div>
      </div>

    </section>
        `;
};