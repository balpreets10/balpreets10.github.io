export const renderProjects = () => {
  return `
    <section id="portfolio" class="portfolio section">
      <div class="container section-title" data-aos="fade-up">
        <h2>PORTFOLIO</h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon"><i class="fa-solid fa-gamepad"></i></div>
          <div class="divider-custom-line"></div>
        </div>
        <p>Games and Applications part of my Portfolio</p>
      </br></br>
      </div><!-- End Section Title -->
      <!-- Portfolio Grid Items-->
      <div class="container">

        <div class="row justify-content-center" data-aos="fade-up" data-aos-delay="100">

          <!-- Portfolio Item 0-->
          <div class="col-md-6 col-lg-4 mb-5">
            <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal0">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><strong
                    class="fas fa-link fa-3x">Rule
                    of 3</strong>
                </div>
              </div>
              <img class="img-fluid" src="assets/img/portfolio/ruleof3.png" alt="Rule of 3" />
            </div>
          </div>

          <div class="col-md-6 col-lg-4 mb-5">
            <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal7">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><strong
                    class="fas fa-link fa-3x">Race
                    for the White House</strong>
                </div>
              </div>
              <img class="img-fluid" src="assets/img/portfolio/race-2.png" alt="Race for the White House" />
            </div>
          </div>

          <!-- Portfolio Item 1-->
          <div class="col-md-6 col-lg-4 mb-5">
            <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><strong class="fas fa-link fa-3x">RS
                    Fun</strong>
                </div>
              </div>
              <img class="img-fluid" src="assets/img/portfolio/rsfun-2.png" alt="RS Fun" />
            </div>
          </div>
          <!-- Portfolio Item 2-->
          <div class="col-md-6 col-lg-4 mb-5">
            <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal2">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><strong
                    class="fas fa-link fa-3x">Bingo
                    Blast</strong>
                </div>
              </div>
              <img class="img-fluid" src="assets/img/portfolio/bingo-blast-2.png" alt="Bingo Blast" />
            </div>
          </div>
          <!-- Portfolio Item 3-->
          <div class="col-md-6 col-lg-4 mb-5">
            <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal3">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><strong
                    class="fas fa-link fa-3x">Hyike
                    Games</strong>
                </div>
              </div>
              <img class="img-fluid" src="assets/img/portfolio/hyike-2.png" alt="Hyike" />
            </div>
          </div>
          <!-- Portfolio Item 4-->
          <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal4">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><strong
                    class="fas fa-link fa-3x">CCA</strong>
                </div>
              </div>
              <img class="img-fluid" src="assets/img/portfolio/cca-2.png" alt="CCA" />
            </div>
          </div>
          <!-- Portfolio Item 5-->
          <div class="col-md-6 col-lg-4 mb-5 mb-md-0">
            <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal5">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><strong
                    class="fas fa-link fa-3x">ABIB</strong>
                </div>
              </div>
              <img class="img-fluid" src="assets/img/portfolio/african-bib-2.png" alt="ABIB" />
            </div>
          </div>
          <!-- Portfolio Item 6-->
          <div class="col-md-6 col-lg-4 mb-5 mb-md-0">
            <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal6">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white"><strong
                    class="fas fa-link fa-3x">UNT</strong>
                </div>
              </div>
              <img class="img-fluid" src="assets/img/portfolio/unt-2.png" alt="UNT" />
            </div>
          </div>
        </div>
      </div>

    </section>


    <div class="portfolio-modal modal fade" id="portfolioModal0" tabindex="-1" aria-labelledby="portfolioModal0"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
          <div class="modal-body text-center pb-5">
            <div class="container portfolio-details">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Rule of 3</h2>
                  <h4 class="text-secondary mb-0">In Development</h4>

                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid rounded mb-5" src="assets/img/portfolio/ruleof3.png" alt="Rule of 3" />
                  <div class="divider"></div>
                  <!-- Portfolio Modal - Text-->
                  <p class="mb-4">Rule of 3 is an Online Learning Academy created to establish equity for English
                    Learners </p>
                </div>
              </div>
              <div class="portfolio-info">
                <ul>
                  <li><strong>Category : </strong>Web</li>
                  <li><strong>Client : </strong>Project Moving Forward</li>
                  <li><strong>Platform : </strong>Phaser</li>
                </ul>

                <h3>Roles and Responsibilities</h3>
                <ul>
                  <li>Oversee development of 9 different games clubbed in 1 package based on Phaser.JS Technology</li>
                  <li>Coordinate and Collaborate between different teams (Art, Audio, Development) using AGILE
                    methodologies</li>
                  <li>Integrate Addressables to reduce initial APK size significantly</li>
                  <li>Implement Base Engine for a set of 3 race games</li>
                  <li>Integrate REST API's</li>
                  <li>Manage a team of 4 developers</li>
                </ul>
                <a href="https://abcruleof3.com/" class="btn-visit align-items-center" target="_blank"
                  rel="noopener noreferrer">Visit Website</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Modal 7-->
    <div class="portfolio-modal modal fade" id="portfolioModal7" tabindex="-1" aria-labelledby="portfolioModal7"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
          <div class="modal-body text-center pb-5">
            <div class="container portfolio-details">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Race for the White House</h2>
                  <h4 class="text-secondary mb-0">In Development</h4>
                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  </br>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid rounded mb-5" src="assets/img/portfolio/race-2.png"
                    alt="Race for the White House" />
                  <div class="divider"></div>
                  <!-- Portfolio Modal - Text-->
                  <p class="mb-4">Race for the White House is a 2D Strategy based Multiplayer Game where players take
                    turns to try and win the Elections </p>
                </div>
              </div>
              <div class="portfolio-info">
                <ul>
                  <li><strong>Category : </strong>Android, Standalone, WEBGL, iOS</li>
                  <li><strong>Client : </strong>Ardent Info</li>
                  <li><strong>Platform : </strong>Unity</li>
                  <h3>Roles and Responsibilities</h3>
                  <ul>
                    <li>Oversee Technical Direction of the project</li>
                    <li>Integrate Turn Based Multiplayer Mechanism</li>
                    <li>Created an Extensible Base for handling Multiplayer Logic, Connection Requests and Matchmaking
                      on Frontend</li>
                    <li>Usage of Addressables resulting in deployment of Dynamic Characters and Animations in Production
                      Environment</li>
                    <li>Use of JIRA to track bugs and fixes</li>
                  </ul>
                  <a href="https://youtu.be/8tqjcQB0JLc"
                    class="btn-visit align-items-center" target="_blank" rel="noopener noreferrer">Link to Gameplay
                    Video</a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Portfolio Modal 1-->
    <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" aria-labelledby="portfolioModal1"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
          <div class="modal-body text-center pb-5">
            <div class="container portfolio-details">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">RS Fun</h2>
                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid rounded mb-5" src="assets/img/portfolio/rsfun-2.png" alt="RS Fun" />
                  <div class="divider"></div>
                  <!-- Portfolio Modal - Text-->
                  <p class="mb-4">RSFun is free casino slot game. It provides casino players with more than 70 slot
                    games along with bonuses</p>
                </div>
              </div>
              <div class="portfolio-info">
                <br>
                <li><strong>Category : </strong>Android, IOS, Web, Standalone</li>
                <li><strong>Client : </strong> Webzool Inc</li>
                <li><strong>Platform : </strong> Unity</li>
                <h3>Roles and Responsibilities</h3>
                <ul>
                  <li>Implemented a new Core Engine for Slot game which lowered Game Addition Time by 30%</li>
                  <li>Designed an automated Custom Build Test System resulting in lower test times and faster
                    diagnostics</li>
                  <li>Implement Scalable mechanisms to add Minigames later on in the project lifecycle which
                    facilitated dynamic addition of Minigames without the need of updating the app itself</li>
                  <li>Manage a team of 15 frontend developers, distribute and monitor tasks given to them using JIRA
                  </li>
                  <li>Implement Asset Bundles resulting in lower Initial APK size</li>
                  <li>Implement Scriptable Objects to create Multiple GUI Skins for the same UI</li>
                  <li>Integrate Caching Mechanism to make efficient use of Internet Bandwidth while also making sure
                    that updates are fetched as soon as available</li>
                  <li>Migrated from Asset Bundles to Addressables in order to stay up-to date with advancing
                    technologies</li>
                  <li>Build and Deploy updates on Google Play Store, App Store, Web Server and Standalone on monthly
                    basis</li>


                </ul>
                <a href="https://www.webzool.io/" class="btn-visit align-items-center" target="_blank"
                  rel="noopener noreferrer">Visit Website</a></br></br>
                <a href="https://apps.apple.com/in/app/rsfun/id1495582389/" class="btn-visit align-items-center"
                  target="_blank" rel="noopener noreferrer">App Link</a> <a href="https://playriverathome.net/" class="btn-visit align-items-center" target="_blank"
                  rel="noopener noreferrer">Web Link</a></br></br>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Portfolio Modal 2-->
    <div class="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" aria-labelledby="portfolioModal2"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
          <div class="modal-body text-center pb-5">
            <div class="container portfolio-details">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Bingo Blast</h2>
                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid rounded mb-5" src="assets/img/portfolio/bingo-blast-2.png" alt="Bingo Blast" />
                  <div class="divider"></div>
                  <!-- Portfolio Modal - Text-->
                  <p class="mb-4">Bingo Blast is a card based Multiplayer Game. The goal of the game is to strike out
                    all the numbers drawn by the bingo master.
                    Any player who strikes all the numbers on their card first, wins. This is a chance based game</p>
                </div>
              </div>

              <div class="portfolio-info">
                <ul>
                  <li><strong>Category : </strong>Android, IOS</li>
                  <li><strong>Client : </strong> Lucky Strike Games</li>
                  <li><strong>Platform : </strong> Unity</li>

                </ul>
                <h3>Roles and Responsibilities</h3>
                <ul>
                  <li>Design and Develop Scalable Architecture for Minigames which sped up the addition process by 20%
                  </li>
                  <li>Implement Minigames and Event Notification System resulting in 30% lower coding overhead overall
                  </li>
                  <li>Work on Core Game Features and Integrate REST API's</li>
                  <li>Debug and Fix issues using JIRA with already implemented systems</li>
                </ul>

                <a href="https://download.cnet.com/developer/lucky-strike-games/i-10719425/?ex=WLS-2202.3/"
                  class="btn-visit align-items-center" target="_blank" rel="noopener noreferrer">Visit Website
                  (Website Down)</a></br></br>
                <a href="https://download.cnet.com/bingo-blast-1-party-game-app/3000-2647_4-78247244.html?ex=WLS-2202.3/"
                  class="btn-visit align-items-center" target="_blank" rel="noopener noreferrer">App Link</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Portfolio Modal 3-->
    <div class="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" aria-labelledby="portfolioModal3"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
          <div class="modal-body text-center pb-5">
            <div class="container portfolio-details">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Hyike Games</h2>
                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid rounded mb-5" src="assets/img/portfolio/hyike-2.png" alt="Hyike" />
                  <div class="divider"></div>
                  <!-- Portfolio Modal - Text-->
                  <p class="mb-4">Hyike is a gaming platform designed to host casual games. The first games published
                    was Ludo, which is a traditional 4 player game.
                    Each player takes turns to roll dice and move their pawns forward. The first player to take all of
                    their pawns to the center wins</p>
                </div>
              </div>

              <div class="portfolio-info">
                <ul>
                  <li><strong>Category : </strong>Android</li>
                  <li><strong>Client : </strong> Hyike Games</li>
                  <li><strong>Platform : </strong> Unity</li>

                </ul>
                <h3>Roles and Responsibilities</h3>
                <ul>
                  <li>Design and Develop Online Ludo Game</li>
                  <li>Integrate Multiplayer Functionality based on Photon Multiplayer Plugin</li>
                  <li>Integrate Art, Audio and Animations in the game and Data Analytics using PlayFab Plugin</li>
                  <li>Debug and Fix bugs using JIRA</li>
                </ul>

                <a href="https://www.facebook.com/hyike/" class="btn-visit align-items-center" target="_blank"
                  rel="noopener noreferrer">Visit Page</a></br></br>
                <a href="https://download.cnet.com/developer/hyike-games/i-11069882/"
                  class="btn-visit align-items-center" target="_blank" rel="noopener noreferrer">App Link</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Portfolio Modal 4-->
    <div class="portfolio-modal modal fade" id="portfolioModal4" tabindex="-1" aria-labelledby="portfolioModal4"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
          <div class="modal-body text-center pb-5">
            <div class="container portfolio-details">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">My CCA</h2>
                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid rounded mb-5" src="assets/img/portfolio/cca-2.png" alt="CCA" />
                  <div class="divider"></div>
                  <!-- Portfolio Modal - Text-->
                  <p class="mb-4">MY CCA is an app designed to provide convenience to the pensioners of Department of
                    telecommunications
                    as well as current employees and staff members, including the Administrative Staff
                  </p>
                  <div class="portfolio-info">
                    <ul>
                      <li><strong>Category : </strong>Android</li>
                      <li><strong>Client : </strong> Controller of Communication Accounts, JK</li>
                      <li><strong>Platform : </strong> Android Studio</li>

                    </ul>
                    <h3>Roles and Responsibilities</h3>
                    <ul>
                      <li>Implement a Data Collection and Verification Application for a Govt. Organisation</li>
                      <li>Implement Authorization Mechanisms for employees to enter verified records and State
                        Management
                        in order to let users use the app in remote areas without internet access</li>
                      <li>Integrate precise GPS services</li>
                    </ul>

                    <a href="https://www.cgca.gov.in/ccajk/" class="btn-visit align-items-center" target="_blank"
                      rel="noopener noreferrer">Visit Page</a></br></br>
                    <a href="https://apkpure.com/my-cca/com.mycca" class="btn-visit align-items-center" target="_blank"
                      rel="noopener noreferrer">App Link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Portfolio Modal 5-->
    <div class="portfolio-modal modal fade" id="portfolioModal5" tabindex="-1" aria-labelledby="portfolioModal5"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
          <div class="modal-body text-center pb-5">
            <div class="container portfolio-details">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h3 class="portfolio-modal-title text-secondary text-uppercase mb-0">African BIB</h3>
                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid rounded mb-2" src="assets/img/portfolio/african-bib-2.png" alt="African BIB" />
                  <div class="divider"></div>
                  <!-- Portfolio Modal - Text-->
                  <p class="mb-4">African Business Information Bank is an organisation aimed towards aiding Businesses
                    from Africa.</p>
                  <div class="portfolio-info">
                    <ul>
                      <li><strong>Category : </strong>Android</li>
                      <li><strong>Client : </strong> African BIB</li>
                      <li><strong>Platform : </strong> Android Studio</li>

                    </ul>

                    <h3>Roles and Responsibilities</h3>
                    <ul>
                      <li>Design and Develop Android Based Data Collection App</li>
                      <li>Built a system to collect info in the app and then send them to a secure server using Data
                        Compression</li>
                      <li>Generate Analytical Reports based on the data collected</li>
                      <li>Integrate REST API's to communicate with Backend Server</li>
                    </ul>

                    <a href="https://africanbib.com/" class="btn-visit align-items-center" target="_blank"
                      rel="noopener noreferrer">Visit Page</a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Modal 5-->
    <div class="portfolio-modal modal fade" id="portfolioModal6" tabindex="-1" aria-labelledby="portfolioModal6"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
          <div class="modal-body text-center pb-5">
            <div class="container portfolio-details">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h4 class="portfolio-modal-title text-secondary text-uppercase mb-0">Universal News Timeline</h4>
                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid rounded mb-5" src="assets/img/portfolio/unt-2.png" alt="UNT" />
                  <div class="divider"></div>

                  <!-- Portfolio Modal - Text-->
                  <p class="mb-4">Universal News Timeline is Web News Portal designed to keep people updated on the
                    latest happennings.</p>

                </div>
              </div>
              <div class="portfolio-info">
                <ul>
                  <li><i>Category : </i>Android</li>
                  <li><strong>Client : </strong> UNT</li>
                  <li><strong>Platform : </strong> Android Studio</li>

                </ul>

                <h3>Roles and Responsibilities</h3>
                <ul>
                  <li>Integrate a website's blog to an Android App</li>
                  <li>Integrate a Push Notification System to notify users of Latest News</li>
                  <li>Build and Publish the app on Google Play Store </li>
                </ul>

                <a href="https://universalnewstimeline.com/" class="btn-visit align-items-center" target="_blank"
                  rel="noopener noreferrer">Visit Page</a></br></br>
                <a href="https://apkpure.com/universal-news-timeline-unt/com.unt.universalnewstimeline/"
                  class="btn-visit align-items-center" target="_blank" rel="noopener noreferrer">App Link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </section>
      `;
};